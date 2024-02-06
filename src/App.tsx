import { createContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './App.css'
import { Database } from './Database'
import { useStartNewGameListener } from './Events'
import { GameContainer } from './components/GameContainer'
import { Board } from './engine/Board'
import { BoardFactory } from './engine/BoardFactory'
import { GameLevel, GameMode, levelFromString, modeFromString, modeLevelMap } from './engine/types/AvailableGames'
import { KeyHandler } from './input/KeyHandler'

const defaultMode = Database.loadGameModeOrDefault(GameMode.CLASSIC)
const defaultLevel = Database.loadGameLevelOrDefault(GameLevel.MEDIUM)

export let BoardContext: React.Context<Board> // = createContext(board)

function App() {
    const navigate = useNavigate()
    const { mode, level } = useParams()
    const [gameId, setGameId] = useState<number>(0)
    const [board, setBoard] = useState<Board | undefined>(undefined)

    const updateBoard = async (mode: GameMode, level: GameLevel) => {
        const newBoard = await new BoardFactory().createNewBoard(mode, level)
        navigate(`../../${mode.toLowerCase()}/${level.toLowerCase()}/`, { replace: true, relative: 'route' })

        Database.saveGameLevel(level)
        Database.saveGameMode(mode)
        setBoard(() => newBoard)
        setGameId(() => gameId + 1)
        BoardContext = createContext(newBoard)
    }

    useEffect(() => {
        if (mode && level) {
            const validMode = modeFromString(mode)
            const validLevel = levelFromString(level)
            if (modeLevelMap.get(validMode!)?.includes(validLevel!)) {
                updateBoard(validMode!, validLevel!)
                return
            }
        }
        updateBoard(defaultMode, defaultLevel)
    }, [])

    useStartNewGameListener(async (payload) => {
        updateBoard(payload.mode, payload.level)
    })

    const renderContext = () => {
        if (board) {
            return (
                <BoardContext.Provider value={board}>
                    <KeyHandler>
                        <GameContainer></GameContainer>
                    </KeyHandler>
                </BoardContext.Provider>
            )
        }
        return <></>
    }

    return (
        <div key={gameId} id="app">
            {renderContext()}
        </div>
    )
}

export default App
