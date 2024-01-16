import { createContext, useState } from 'react'
import './App.css'
import { useRestartListener, useStartNewGameListener } from './Events'
import { GameContainer } from './components/GameContainer'
import { BoardFactory } from './engine/BoardFactory'
import { GameLevel } from './engine/types/GameLevel'
import { GameMode } from './engine/types/GameMode'
import { KeyHandler } from './input/KeyHandler'
import { Database } from './Database'


let board = await new BoardFactory().createNewBoard(Database.loadGameModeOrDefault(GameMode.CLASSIC),
    Database.loadGameLevelOrDefault(GameLevel.MEDIUM))
export let BoardContext = createContext(board)

function App() {
    const [gameId, setGameId] = useState<number>(0)

    useRestartListener(async () => {
        BoardContext = createContext(board)
        setGameId(() => gameId + 1)
    })

    useStartNewGameListener(async payload => {
        board = await new BoardFactory().createNewBoard(payload.mode, payload.level)
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
