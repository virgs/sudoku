import { createContext, useState } from 'react'
import './App.css'
import { Database } from './Database'
import { useStartNewGameListener } from './Events'
import { GameContainer } from './components/GameContainer'
import { BoardFactory } from './engine/BoardFactory'
import { GameLevel, GameMode } from './engine/types/AvailableGames'
import { KeyHandler } from './input/KeyHandler'

let board = await new BoardFactory().createNewBoard(
    Database.loadGameModeOrDefault(GameMode.CLASSIC),
    Database.loadGameLevelOrDefault(GameLevel.MEDIUM)
)
export let BoardContext = createContext(board)

function App() {
    const [gameId, setGameId] = useState<number>(0)

    useStartNewGameListener(async (payload) => {
        board = await new BoardFactory().createNewBoard(payload.mode, payload.level)
        BoardContext = createContext(board)
        setGameId(() => gameId + 1)
    })

    return (
        <div key={gameId} id="app" className="p-1 pt-lg-3">
            <BoardContext.Provider value={board}>
                <KeyHandler>
                    <GameContainer></GameContainer>
                </KeyHandler>
            </BoardContext.Provider>
        </div>
    )
}

export default App
