import { faStopwatch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { BoardContext } from '../../App'
import {
    CellValueSetEventType,
    emitTimeElapsed,
    useCellValueSetListener,
    useGameFinishedListener,
    useRestartListener,
} from '../../Events'
import { GameLevel } from '../../engine/types/GameLevel'
import { GameMode } from '../../engine/types/GameMode'
import { useInterval } from '../../hooks/UseInterval'
import { TimeFormatter } from '../../time/TimeFormatter'
import './Header.css'

const ONE_SECOND = 1000

export function Header() {
    const board = useContext(BoardContext)

    const [timerEnabled, setTimerEnabled] = useState<boolean>(true)
    const [mistakesCounter, setMistakesCounter] = useState<number>(0)
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)

    useCellValueSetListener((data: CellValueSetEventType) => {
        if (!data.valueIsCorrect) {
            setMistakesCounter(mistakesCounter + 1)
        }
    })

    useGameFinishedListener(() => {
        setTimerEnabled(false)
    })

    useInterval(
        () => {
            setElapsedSeconds((x) => x + 1)
            emitTimeElapsed({
                elapsedSeconds: elapsedSeconds + 1,
            })
        },
        timerEnabled ? ONE_SECOND : undefined
    )

    useRestartListener(() => {
        setElapsedSeconds(0)
        setMistakesCounter(0)
    })

    return (
        <div className="row justify-content-between mb-3">
            <div className="col-12 header-info">
                <h2>
                    <strong className="mode-level">{`${GameMode[board.gameMode]}: ${GameLevel[board.gameLevel]}`}</strong>
                </h2>
            </div>
            <div className="col-6 header-info" style={{ textAlign: 'left' }}>
                <FontAwesomeIcon className="font-awesome-icon" icon={faXmark} color="var(--bs-warning)" />
                <span>
                    <strong>{mistakesCounter}</strong>
                </span>
            </div>
            <div className="col-6 header-info" style={{ textAlign: 'right' }}>
                <FontAwesomeIcon className="font-awesome-icon" icon={faStopwatch} color="var(--bs-warning)" />
                <span style={{ width: '3rem', display: 'inline-block', textAlign: 'left' }}>
                    <strong>{new TimeFormatter().formatDuration(elapsedSeconds)}</strong>
                </span>
            </div>
        </div>
    )
}
