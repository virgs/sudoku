import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { BoardContext } from '../App'
import { StartNewGameEventType } from '../Events'
import { GameLevel, GameMode, modeLevelMap } from '../engine/types/AvailableGames'

export function NewGameSelector(props: { onNewGameClicked: (payload: StartNewGameEventType) => void }) {
    const board = useContext(BoardContext)

    const [currentSelectedMode, setCurrentSelectedMode] = useState<GameMode>(board.gameMode)
    const [currentSelectedLevel, setCurrentSelectedLevel] = useState<GameLevel>(board.gameLevel)

    return (
        <>
            <div className="mb-2">
                <h5>Mode</h5>
                <div>
                    <nav className="nav nav-pills nav-fill">
                        {Array.from(modeLevelMap.keys()).map((mode) => {
                            const classList = ['nav-link']
                            if (currentSelectedMode === mode) {
                                classList.push('active')
                            }
                            return (
                                <a
                                    key={mode}
                                    className={classList.join(' ')}
                                    onPointerDown={() => {
                                        const availableModeLevels: GameLevel[] = modeLevelMap.get(mode)!
                                        setCurrentSelectedLevel(
                                            availableModeLevels[Math.floor(availableModeLevels.length / 2)]
                                        )
                                        return setCurrentSelectedMode(mode)
                                    }}
                                    style={{ textTransform: 'capitalize' }}
                                    href="#"
                                >
                                    {mode.toLowerCase()}
                                </a>
                            )
                        })}
                    </nav>
                </div>
            </div>

            <div className="mb-2">
                <h5>Level</h5>
                <div>
                    <nav className="nav nav-pills nav-fill">
                        {modeLevelMap.get(currentSelectedMode)!.map((level) => {
                            const classList = ['nav-link']
                            if (currentSelectedLevel === level) {
                                classList.push('active')
                            }
                            return (
                                <a
                                    key={level}
                                    className={classList.join(' ')}
                                    onPointerDown={() => setCurrentSelectedLevel(level)}
                                    style={{ textTransform: 'capitalize' }}
                                    href="#"
                                >
                                    {level.toLowerCase()}
                                </a>
                            )
                        })}
                    </nav>
                </div>
            </div>

            <button
                className="btn btn-sm btn-success mb-2"
                type="button"
                onPointerDown={() => {
                    props.onNewGameClicked({
                        level: currentSelectedLevel,
                        mode: currentSelectedMode,
                    })
                }}
                style={{ float: 'right' }}
            >
                <FontAwesomeIcon className="font-awesome-icon" icon={faCirclePlay} />
                <span className="d-none me-1 d-xl-inline">Start</span>
            </button>
        </>
    )
}
