import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { JigsawBoardCreator } from './engine/jigsaw/JigsawBoardCreator.ts'
import { GameLevel } from './engine/types/AvailableGames.ts'

const template = `001111222
000011222
003411122
033445552
333444555
633344558
667774588
666778888
666777788`
    .split('\n')
    .map(line => line.split('')
        .map(n => Number(n)))
const jigsawBoard = new JigsawBoardCreator(9, GameLevel.MEDIUM, template)
console.table(jigsawBoard.getBoard())

navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
        registration.unregister();
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
