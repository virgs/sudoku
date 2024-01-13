import './App.css'
import { BoardComponent } from './components/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'
import { BoardWrapper } from './wrapper/BoardWrapper'

function App() {
    const killerBoard = new BoardWrapper(new KillerBoardCreator().createBoardFromText(fileContent))

    return (
        <div id="app">
            <BoardComponent boardWrapper={killerBoard} />
        </div>
    )
}

export default App
