import { createContext } from 'react'
import './App.css'
import { BoardComponent } from './components/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'

const killerBoard = new KillerBoardCreator().createBoardFromText(fileContent)
export const BoardContext = createContext(killerBoard);

function App() {


    return (
        <div id="app">
            <BoardContext.Provider value={killerBoard}>
                <BoardComponent />
            </BoardContext.Provider>
        </div>
    )
}

export default App
