import { useState } from 'react'
import './App.css'
import { BoardComponent } from './components/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'
import { BoardWrapper } from './wrapper/BoardWrapper'
import { KillerBoardWrapper } from './wrapper/killer/KillerBoardWrapper'

function App() {
    const killerBoard = new KillerBoardWrapper(new KillerBoardCreator().createBoardFromText(fileContent))
    const [board] = useState<BoardWrapper>(killerBoard)

    return (
        <div id="app">
            <BoardComponent boardWrapper={board} />
        </div>
    )
}

export default App
