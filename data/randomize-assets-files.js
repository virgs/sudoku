import fs from 'fs';

const numberOfCachedFiles = Number(process.argv[2])

const directories = [
    'killer/easy',
    'killer/expert',
    'killer/hard',
    'killer/medium',
    'jigsaw/easy',
    'jigsaw/expert',
    'jigsaw/hard',
    'jigsaw/medium',
    'mini'
]

directories.forEach(dir => {
    fs.readdirSync(`src/assets/puzzles/${dir}`)
        .forEach(filename => {
            fs.unlinkSync(`src/assets/puzzles/${dir}/${filename}`)
        })

    fs.readdirSync(`data/${dir}`)
        .sort(() => Math.random() - .5)
        .filter((_, index) => index < numberOfCachedFiles)
        .map((filename, index) => {
            console.log(index, filename);
            fs.copyFileSync(`data/${dir}/${filename}`, `src/assets/puzzles/${dir}/${filename}`)
        })
})
