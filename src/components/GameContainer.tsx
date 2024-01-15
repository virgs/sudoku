import { useContext, useState } from 'react'
import { CellValueSetEventType, GameFinishedEventType, emitGameFinished, useAllCellsRevealedListener, useCellValueSetListener, useGameFinishedListener, useNumberPressedListener, useTimeElapsedListener } from '../Events'
import './GameContainer.css'
import { GameVictoryModalComponent } from './GameVictoryModalComponent'
import { BoardComponent } from './board/BoardComponent'
import { ControlsComponent } from './controls/ControlsComponent'
import { Header } from './controls/Header'
import { Database } from '../Database'
import { BoardContext } from '../App'

export function GameContainer() {
    const board = useContext(BoardContext)

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

    useTimeElapsedListener(payload => {
        setElapsedSeconds(payload.elapsedSeconds)
    })

    useAllCellsRevealedListener(() => {
        const finishedGameData = {
            hints: hintsCounter,
            mistakes: mistakesCounter,
            elapsedSeconds: elapsedSeconds,
            board: board
        }
        Database.saveGameFinishedStats(finishedGameData)
        emitGameFinished(finishedGameData)
        setGameVictoryData(finishedGameData)
    })

    return (
        <div className="container-lg p-0">
            <div className="row justify-content-center gy-3">
                <div className="col-12 col-sm-6 col-md-7 col-lg-6">
                    <div className="d-sm-none">
                        <Header></Header>
                    </div>
                    <BoardComponent />
                </div>
                <div className="col-sm-6 col-md-5 col-lg-5 align-self-start px-3 px-xl-4">
                    <div className="d-none d-sm-block">
                        <Header></Header>
                    </div>
                    <ControlsComponent></ControlsComponent>
                </div>
            </div>
            <GameVictoryModalComponent data={gameVictoryData}></GameVictoryModalComponent>
        </div>
    )
}
