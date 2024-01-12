import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator.ts'
import { fileContent } from './engine/killer/SudokuKillerFile.ts'

const killerBoard = new KillerBoardCreator().createBoardFromText(fileContent)
killerBoard.printAnswers()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
