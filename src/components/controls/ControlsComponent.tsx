import { faBars, faCirclePlay, faEraser, faLightbulb, faPenClip, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../../App'
import {
    CellValueSetEventType,
    emitAnnotationModeChanged,
    emitCurrentValueErased,
    emitNumberPressed,
    emitOpenSettingsDialog,
    emitStartNewGame,
    useAnnotationModeChangedListener,
    useCellSelectedListener,
    useCellValueSetListener,
    useEndGameAnimationFinishedListener,
} from '../../Events'
import { Board } from '../../engine/Board'
import { AnnotationMode } from '../../input/AnnotationMode'
import { Point, pointsAreEqual } from '../../math/Point'
import './ControlsComponent.css'
import { NumPadComponent } from './NumPadComponent'

type Hint = {
    position: Point
    answer: number
}

function createHints(board: Board) {
    const revealed: Hint[] = []
    board.grid.cells.forEach((cellLines, y) =>
        cellLines.forEach((cell, x) => {
            revealed.push({
                position: {
                    x: x,
                    y: y,
                },
                answer: cell.answer,
            })
        })
    )
    return revealed
}

export function ControlsComponent() {
    const board = useContext(BoardContext)

    const [gameFinishedConfiguration, setGameFinishedConfiguration] = useState<boolean>(false)
    const [numberOfHintsGiven, setNumberOfHintsGiven] = useState<number>(0)
    const [annotationMode, setAnnotationMode] = useState<AnnotationMode>(AnnotationMode.PENCIL)
    const [availableHints, setAvailableHints] = useState<Hint[]>(createHints(board))
    const [currentSelectedCellPosition, setCurrentSelectedCellPosition] = useState<Point | undefined>()

    useCellSelectedListener((payload) => setCurrentSelectedCellPosition(payload.position))

    const onNumberPressed = (value: number) => {
        emitNumberPressed({
            value: value,
            annotationMode: annotationMode,
        })
    }

    useEndGameAnimationFinishedListener(() => {
        setGameFinishedConfiguration(true)
    })

    useCellValueSetListener((data: CellValueSetEventType) => {
        if (data.valueIsCorrect) {
            setAvailableHints(availableHints.filter((hint) => !pointsAreEqual(hint.position, data.position)))
        }
    })

    useEffect(() => {
        emitAnnotationModeChanged(annotationMode)
    }, [])

    useAnnotationModeChangedListener((annotationMode) => setAnnotationMode(annotationMode))

    const onAnnotationModeButtonClick = (annotationMode: AnnotationMode) => {
        setAnnotationMode(annotationMode)
        emitAnnotationModeChanged(annotationMode)
    }

    const onHintClick = () => {
        setNumberOfHintsGiven(numberOfHintsGiven + 1)
        emitNumberPressed({
            value: availableHints.find((hint) => pointsAreEqual(hint.position, currentSelectedCellPosition!))!.answer,
            annotationMode: AnnotationMode.PEN,
            hint: true,
        })
    }

    const startGameButton = () => {
        if (gameFinishedConfiguration) {
            return (
                <button
                    className="btn btn-sm btn-success action-button me-md-2 fa-bounce"
                    type="button"
                    onPointerDown={() =>
                        emitStartNewGame({
                            level: board.gameLevel,
                            mode: board.gameMode,
                        })
                    }
                >
                    <FontAwesomeIcon className="font-awesome-icon" icon={faCirclePlay} />
                    <span className="d-none me-1 d-xl-inline">New Game</span>
                </button>
            )
        }
    }

    const onDeleteButtonClicked = (): void => {
        emitCurrentValueErased()
    }

    return (
        <div id="controls-component">
            <div className="row justify-content-between g-0 mx-2">
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-sm btn-secondary action-button"
                        onPointerDown={() => onDeleteButtonClicked()}
                    >
                        <FontAwesomeIcon className="font-awesome-icon" icon={faEraser} />
                        <span className="d-none d-xl-inline">Delete</span>
                    </button>
                </div>
                <div className="col" style={{ textAlign: 'center' }}>
                    <div className="btn-group" role="group" aria-label="annotation mode toggle button group">
                        <input
                            type="radio"
                            className="btn-check"
                            name="btnradio"
                            id="pen-btn-radio"
                            autoComplete="off"
                            checked={annotationMode === AnnotationMode.PEN}
                            onChange={() => onAnnotationModeButtonClick(AnnotationMode.PEN)}
                        />
                        <label
                            className={'btn btn-sm action-button '.concat(
                                annotationMode === AnnotationMode.PEN ? 'btn-secondary' : 'btn-secondary-outline'
                            )}
                            htmlFor="pen-btn-radio"
                        >
                            <FontAwesomeIcon
                                opacity={annotationMode === AnnotationMode.PENCIL ? 0.5 : 1}
                                className="font-awesome-icon"
                                icon={faPenClip}
                            />
                            <span className="d-none d-xl-inline me-1">Pen</span>
                        </label>
                        <input
                            type="radio"
                            className="btn-check"
                            name="btnradio"
                            id="pencil-btn-radio"
                            autoComplete="off"
                            checked={annotationMode === AnnotationMode.PENCIL}
                            onChange={() => onAnnotationModeButtonClick(AnnotationMode.PENCIL)}
                        />
                        <label
                            className={'btn btn-sm action-button '.concat(
                                annotationMode === AnnotationMode.PENCIL ? 'btn-secondary' : 'btn-secondary-outline'
                            )}
                            htmlFor="pencil-btn-radio"
                        >
                            <FontAwesomeIcon
                                opacity={annotationMode === AnnotationMode.PEN ? 0.5 : 1}
                                className="font-awesome-icon"
                                icon={faPencil}
                            />
                            <span className="d-none d-xl-inline me-1">Pencil</span>
                        </label>
                    </div>
                </div>
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-sm btn-secondary action-button"
                        disabled={
                            !!gameFinishedConfiguration ||
                            !currentSelectedCellPosition ||
                            !availableHints.find((hint) => pointsAreEqual(hint.position, currentSelectedCellPosition!))
                        }
                        onPointerDown={onHintClick}
                    >
                        <FontAwesomeIcon className="font-awesome-icon" icon={faLightbulb} />
                        <span className="d-none me-1 d-xl-inline">Hint</span>
                        <span className="badge text-bg-success">{numberOfHintsGiven}</span>
                    </button>
                </div>
            </div>
            <div className="my-3">
                <NumPadComponent onNumberPressed={onNumberPressed} />
            </div>
            <div className="d-flex gap-2 mx-2">
                {startGameButton()}
                <button
                    className="btn btn-sm btn-secondary action-button ms-auto"
                    type="button"
                    onPointerDown={() => emitOpenSettingsDialog()}
                >
                    <FontAwesomeIcon className="font-awesome-icon" icon={faBars} />
                    <span className="d-none me-1 d-xl-inline">Menu</span>
                </button>
            </div>
        </div>
    )
}
