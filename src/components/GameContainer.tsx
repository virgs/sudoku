import { useContext, useState } from 'react'
import { BoardContext } from '../App'
import { Database } from '../Database'
import {
    CellValueSetEventType,
    GameFinishedEventType,
    emitGameFinished,
    useCellValueSetListener,
    useEndGameAnimationFinishedListener,
    useNumberPressedListener,
    useOpenSettingsDialogListener,
    useTimeElapsedListener,
} from '../Events'
import './GameContainer.css'
import { BoardComponent } from './board/BoardComponent'
import { ControlsComponent } from './controls/ControlsComponent'
import { Header } from './controls/Header'
import { GameSettingsModalComponent } from './modals/GameSettingsModalComponent'
import { GameVictoryModalComponent } from './modals/GameVictoryModalComponent'

export function GameContainer() {
    const board = useContext(BoardContext)

    const [showGameSettingsModal, setShowGameSettingsModal] = useState<boolean>(false)
    const [gameVictoryData, setGameVictoryData] = useState<GameFinishedEventType | undefined>()
    const [hintsCounter, setHintsCounter] = useState<number>(0)
    const [mistakesCounter, setMistakesCounter] = useState<number>(0)
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)

    useCellValueSetListener((data: CellValueSetEventType) => {
        if (!data.valueIsCorrect) {
            setMistakesCounter(mistakesCounter + 1)
        }
    })

    useNumberPressedListener((payload) => {
        if (payload.hint) {
            setHintsCounter(hintsCounter + 1)
        }
    })

    useTimeElapsedListener((payload) => {
        setElapsedSeconds(payload.elapsedSeconds)
    })

    useEndGameAnimationFinishedListener(() => {
        const finishedGameData = {
            hints: hintsCounter,
            mistakes: mistakesCounter,
            elapsedSeconds: elapsedSeconds,
            board: board,
        }
        Database.saveGameFinishedStats(finishedGameData)
        emitGameFinished(finishedGameData)
        setGameVictoryData(finishedGameData)
    })

    useOpenSettingsDialogListener(() => {
        setShowGameSettingsModal(true)
    })

    return (
        <div className="container-lg p-0" style={{ height: '100%' }}>
            <div className="row justify-content-center gt-3 gb-3" style={{ height: '100%' }}>
                <div className="col-12 col-sm-6 col-lg-7 m-0" style={{ height: '100%', maxHeight: '120svw' }}>
                    <div className="d-sm-none mt-2">
                        <Header></Header>
                    </div>
                    <BoardComponent />
                </div>
                <div className="col-12 col-sm-6 col-lg-5 align-self-start px-3 px-xl-4 m-0 py-2">
                    <div className="d-none d-sm-block">
                        <Header></Header>
                    </div>
                    <ControlsComponent></ControlsComponent>
                </div>
            </div>
            <GameVictoryModalComponent data={gameVictoryData} onDismiss={() => setGameVictoryData(undefined)} />
            <GameSettingsModalComponent
                show={showGameSettingsModal}
                onDismiss={() => setShowGameSettingsModal(false)}
            />
        </div>
    )
}
