import fs from 'fs';

// process.argv.filter((_, i) => i > 1)
//   .forEach(filename => {
//     const json = JSON.parse(fs.readFileSync(filename).toString())
//     // console.log(json.id)
//     fs.writeFileSync(`killer/expert/${json.id}.json`, JSON.stringify(json, null, 2))
//   })

//origin: https://sudoku.com/killer/expert/
const level = 'expert'
var options = {
  'method': 'GET',
  // 'hostname': 'sudoku.com',
  // 'path': '/api/level/expert?mode=killer&id=1',
  'headers': {
    // 'Referer': 'https://sudoku.com/killer/expert/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,pt-BR;q=0.6,pt;q=0.5,zh-CN;q=0.4,zh;q=0.3',
    'Connection': 'keep-alive',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Easy-Locale': 'en',
    'Cookie': '__cflb=02DiuE7hKpaqvCsoqtTrKvfsPpYGyrLgYz5wHauBruyn4; first_visit=fv%3D1705219005%26dt%3D1705219005'
  },
  'maxRedirects': 20
};

let remainingDownloads = 1
const save = async () => {
  const response = await fetch(`http://sudoku.com/api/level/${level}?mode=killer`, options)
  const json = await response.json()
  fs.writeFileSync(`killer/${level}/${json.id}.json`, JSON.stringify(json, null, 2))
  if (--remainingDownloads > 0) {
    setTimeout(save, 500)
  }
}

setTimeout(save, 0)
