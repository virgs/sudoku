import fs from 'fs';

//origin: https://sudoku.com/killer/expert/
//Usage: 
// node killer-fetch.js medium killer/medium/*.json
const downloadedIds = []

const level = process.argv[2]

process.argv
  .filter((_, index) => index > 2)
  .forEach((filename) => {
    const fileContent = JSON.parse(fs.readFileSync(filename).toString())
    downloadedIds.push(fileContent.id)
  })

console.log(level, 'different ids: ' + downloadedIds.length)

var options = {
  'method': 'GET',
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

let desiredTotalFiles = 300
const save = async () => {
  const response = await fetch(`http://sudoku.com/api/level/${level}?mode=killer`, options)
  const json = await response.json()
  const gameId = json.id;
  if (!downloadedIds.includes(gameId)) {
    const filename = `killer/${level}/${downloadedIds.length}.json`
    console.log(desiredTotalFiles - downloadedIds.length, 'saving ' + gameId)
    fs.writeFileSync(filename, JSON.stringify(json, null, 2))
    downloadedIds.push(gameId)
  } else {
    console.log('skipping', gameId, downloadedIds.findIndex(downloadedId => downloadedId === gameId))
  }
  if (desiredTotalFiles > downloadedIds.length) {
    setTimeout(save, 300)
  }
}

setTimeout(save, 0)
