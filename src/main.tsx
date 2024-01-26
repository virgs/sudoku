import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { JigsawBoardCreator } from './engine/jigsaw/JigsawBoardCreator.ts'
import { GameLevel } from './engine/types/AvailableGames.ts'

const irregularRegions = [
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
];
// const template = `
// 001111222
// 000011222
// 003411122
// 033445552
// 333444555
// 633344558
// 667774588
// 666778888
// 666777788`
//     .split('\n')
//     .map(line => line.split('')
//         .map(n => Number(n)))
const jigsawBoard = new JigsawBoardCreator(9, GameLevel.MEDIUM, irregularRegions)
console.table(jigsawBoard.getBoard())

navigator.serviceWorker.getRegistrations().then(async (registrations) => {
    console.log(registrations)
    for (let registration of registrations) {
        const unregistration = await registration.unregister();
        console.log(unregistration)
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
