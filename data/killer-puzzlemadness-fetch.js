import fs from 'fs';
//origin: https://puzzlemadness.co.uk/
const level = 'hard'

const milliSecondsPerDay = 86400000 //number of milliseconds in a day
let currentDate = new Date()
let downloadedFiles = 0
let remainingDownloads = 100
const save = async () => {
  const oneDayBefore = new Date(currentDate - milliSecondsPerDay)
  const formattedDate = `${oneDayBefore.getFullYear()}/${oneDayBefore.getMonth() + 1}/${oneDayBefore.getDate()}`
  console.log(downloadedFiles, formattedDate)
  const response = await fetch(`https://puzzlemadness.co.uk/api/user/data/killersudoku/${level}/${formattedDate}`)
  const json = await response.json()
  fs.writeFileSync(`puzzlemadness/${level}/${downloadedFiles}.json`, JSON.stringify(json, null, 2))
  ++downloadedFiles
  currentDate = oneDayBefore
  if (--remainingDownloads > 0) {
    setTimeout(save, 250)
  }
}

setTimeout(save, 0)
