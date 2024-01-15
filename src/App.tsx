import { createContext, useState } from 'react'
import './App.css'
import { KeyHandler } from './input/KeyHandler'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { GameLevel } from './engine/types/GameLevel'
import { useRestartListener } from './Events'
import { GameContainer } from './components/GameContainer'

let board = await new KillerBoardCreator().createBoard(GameLevel.EASY)
export let BoardContext = createContext(board)

function App() {
    const [gameId, setGameId] = useState<number>(0)

    useRestartListener(async () => {
        //to create a new game: board = await new KillerBoardCreator().createBoard(GameLevel.EASY)
        BoardContext = createContext(board)
        setGameId(() => gameId + 1)
    })

    return (
        <div key={gameId} id="app" className="p-2">
            <BoardContext.Provider value={board}>
                <KeyHandler>
                    <GameContainer></GameContainer>
                </KeyHandler>
            </BoardContext.Provider>
        </div>
    )
}

export default App
