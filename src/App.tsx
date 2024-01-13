import './App.css'
import { BoardComponent } from './components/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'
import { KillerBoardWrapper } from './wrapper/killer/KillerBoardWrapper'

function App() {
    const killerBoard = new KillerBoardWrapper(new KillerBoardCreator().createBoardFromText(fileContent))

    return (
        <div id="app">
            <BoardComponent boardWrapper={killerBoard} />
        </div>
    )
}

export default App
