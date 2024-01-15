import { createContext, useState } from 'react'
import './App.css'
import { KeyHandler } from './KeyHandler'
import { ClassicBoardCreator } from './engine/ClassicBoardCreator'
import { GameLevel } from './engine/types/GameLevel'
import { useRestartListener } from './input/Events'

let board = await new ClassicBoardCreator().createBoard(GameLevel.EASY)
export let BoardContext = createContext(board)

function App() {
    const [gameId, setGameId] = useState<number>(0)

    useRestartListener(async () => {
        // board = await new KillerBoardCreator().createBoard(GameLevel.EASY)
        BoardContext = createContext(board)
        setGameId(() => gameId + 1)
    })

    return (
        <div key={gameId} id="app" className="p-2">
            <BoardContext.Provider value={board}>
                <KeyHandler></KeyHandler>
            </BoardContext.Provider>
        </div>
    )
}

export default App
