import fs from 'fs';
//origin: https://www.sudokuonline.io/kids/numbers-6-6

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
// fetch('http://sudoku.com/api/level/expert?mode=killer', options)

//classic: 
/*
{
id: 334,
mission: '030501906047900020690042503060009034020000810073100692400026300010095200052000000',
solution: '238571946547963128691842573165289734924637815873154692489726351316495287752318469',
win_rate: 76.61
}
*/

/*
killer:
{
  id: 386,
  mission: '000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  solution: '568913247342687195197254863685479312734162958219538674926345781851726439473891526',
  win_rate: 69.15,
  cages: [
    [ 0, 1 ],       [ 9, 10, 11, 19, 20 ],
    [ 18, 27 ],     [ 36, 45, 46 ],
    [ 54, 55 ],     [ 63, 72 ],
    [ 28, 37 ],     [ 64, 73 ],
    [ 29, 38 ],     [ 65, 74, 75 ],
    [ 2, 3 ],       [ 12, 13, 14 ],
    [ 30, 31 ],     [ 39, 40 ],
    [ 47, 56, 57 ], [ 4, 5 ],
    [ 21, 22 ],     [ 48, 49, 50 ],
    [ 58, 66, 67 ], [ 76, 77 ],
    [ 23, 32 ],     [ 41, 42, 51, 60 ],
    [ 59, 68 ],     [ 6, 15 ],
    [ 24, 33 ],     [ 69, 70 ],
    [ 34, 35, 44 ], [ 43 ],
    [ 52, 61 ],     [ 78, 79, 80 ],
    [ 7, 8 ],       [ 16, 17 ],
    [ 25, 26 ],     [ 53, 62, 71 ]
  ]
}
*/