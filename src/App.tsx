import './App.css'
import { useEffect } from 'react'
import { BoardComponent } from './components/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'

function App() {
    const killerBoard = new KillerBoardCreator().createBoardFromText(fileContent)
    useEffect(() => {
        killerBoard.printAnswers()
    }, [])

    return <BoardComponent board={killerBoard} />
}

export default App
