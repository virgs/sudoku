import fs from 'fs';
//origin: https://www.sudokuonline.io/kids/numbers-6-6


process.argv
  .filter((_, index) => index > 1)
  // .filter((_, index) => index == 2)
  .forEach((filename, index) => {
    const fileContent = JSON.parse(fs.readFileSync(filename).toString())
    fs.writeFileSync(`killer/hard/${index}.json`, fileContent)
  })

var options = {
  'method': 'POST',
  'body': JSON.stringify({ difficulty: 1 }), // body data type must match "Content-Type" header
  'headers': {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,pt-BR;q=0.6,pt;q=0.5,zh-CN;q=0.4,zh;q=0.3',
    'Connection': 'keep-alive',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Easy-Locale': 'en',
    'Cookie': '__cflb=02DiuE7hKpaqvCsoqtTrKvfsPpYGyrLgYz5wHauBruyn4; first_visit=fv%3D1705219005%26dt%3D1705219005',
    'X-Auth-Token': 'AG_V1 YmU1NDc4NWNmNmZmYjY1NzczYjc0OTAzZmE0N2ZkNDdjMTZiZmQxNg==',
  },
  'maxRedirects': 20
};

let remainingDownloads = 50
const save = async () => {
  const response = await fetch(`https://games-api.appgeneration.com/game/sudoku/getrandompuzzle`, options)
  const json = await response.json()
  fs.writeFileSync(`mini/${json.puzzle.id}-${Date.now()}.json`, JSON.stringify(json, null, 2))
  if (--remainingDownloads > 0) {
    setTimeout(save, 500)
  }
}

setTimeout(save, 0)
