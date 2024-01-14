import { useContext, useEffect, useState } from 'react'
import { CellValueSetEventType, useCellValueSetListener } from '../../input/Events'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { BoardContext } from '../../App'
import { GameLevel } from '../../engine/types/GameLevel'
import { GameMode } from '../../engine/types/GameMode'

const formatDuration = (ms: number) => {
    const days = Math.floor(ms / 86400)
    const hours = Math.floor(ms / 3600) % 24
    const minutes = (Math.floor(ms / 60) % 60).toString().padStart(2, '0')
    const seconds = (ms % 60).toString().padStart(2, '0')

    let timer = `${minutes}:${seconds}`
    if (days > 0) {
        timer = `${days}d, ${hours} h, ` + timer
    } else if (hours > 0) {
        timer = `${hours}h, ` + timer
    }
    return timer
}

export function Header() {
    const board = useContext(BoardContext)

    const [mistakesCounter, setMistakesCounter] = useState<number>(0)
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)

    useCellValueSetListener((data: CellValueSetEventType) => {
        if (!data.valueIsCorrect) {
            setMistakesCounter(mistakesCounter + 1)
        }
    })

    useEffect(() => {
        const interval = setInterval(() => setElapsedSeconds((x) => x + 1), 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="row justify-content-between mb-3 ml-2">
            <div className="col-auto header-info">
                <span>
                    <strong>{`${GameLevel[board.gameLevel]}: ${GameMode[board.gameMode]}`}</strong>
                </span>
            </div>
            <div className="col-auto header-info">
                <span>
                    <strong>{mistakesCounter}</strong>
                </span>
                <FontAwesomeIcon className="font-awesome-icon" icon={faXmark} color="var(--bs-danger)" />
            </div>
            <div className="col-auto header-info">
                <span>
                    <strong>{formatDuration(elapsedSeconds)}</strong>
                </span>
                <FontAwesomeIcon className="font-awesome-icon" icon={faHourglass} color="var(--bs-primary)" />
            </div>
        </div>
    )
}
