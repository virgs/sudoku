# How to

1. Go to:

    <https://sudoku.com/api/level/expert?mode=killer>

Open browser console, and:

```js
    request = new Request('https://sudoku.com/api/level/expert?mode=killer', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,pt-BR;q=0.6,pt;q=0.5,zh-CN;q=0.4,zh;q=0.3',
                'Connection': 'keep-alive',
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://sudoku.com/killer/expert/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'X-Easy-Locale': 'en',
                'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"macOS"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
            }
        });
    const response = await fetch(request);
    const json = await response.json();
    // voilà
```

result:

```json
{
    "id": 342,
    "mission": "000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "solution": "568794132473621598921385764856139427234876915719542683692453871185267349347918256",
    "win_rate": 46.27,
    "cages": [ //The cages are composed of the cells index [0, 80]
        [
            0,
            1,
            10
        ],
        //...
        [
            71,
            80
        ]
    ]
}
```
