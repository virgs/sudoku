import { faArrowRotateRight, faEraser, faGear, faLightbulb, faPenClip, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../../App'
import { Board } from '../../engine/Board'
import { AnnotationMode } from '../../input/AnnotationMode'
import {
    CellValueSetEventType,
    emitAnnotationModeChanged,
    emitCurrentValueErased,
    emitNumberPressed,
    emitRestart,
    useAnnotationModeChangedListener,
    useCellSelectedListener,
    useCellValueSetListener,
    useRestartListener,
} from '../../input/Events'
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

    useCellValueSetListener((data: CellValueSetEventType) => {
        if (data.valueIsCorrect) {
            setAvailableHints(availableHints.filter((hint) => !pointsAreEqual(hint.position, data.position)))
        }
    })

    useEffect(() => {
        emitAnnotationModeChanged(annotationMode)
    }, [])

    useAnnotationModeChangedListener((annotationMode) => setAnnotationMode(annotationMode))

    useRestartListener(() => {
        setNumberOfHintsGiven(0)
    })

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

    return (
        <div id="controls-component">
            <div className="row justify-content-between g-0 mx-2">
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary action-button"
                        onPointerDown={() => emitCurrentValueErased()}
                    >
                        <FontAwesomeIcon color='var(--bs-primary)' className="font-awesome-icon" icon={faEraser} />
                        <span className="d-none d-xl-inline">Delete</span>
                    </button>
                </div>
                <div className="col" style={{ textAlign: 'center' }}>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input
                            type="radio"
                            className="btn-check"
                            name="btnradio"
                            id="pen-btn-radio"
                            autoComplete="off"
                            checked={annotationMode === AnnotationMode.PEN}
                            onChange={() => onAnnotationModeButtonClick(AnnotationMode.PEN)}
                        />
                        <label className="btn btn-sm btn-outline-secondary action-button" htmlFor="pen-btn-radio">
                            <FontAwesomeIcon color={annotationMode === AnnotationMode.PEN ? 'var(--bs-primary)' : undefined} className="font-awesome-icon" icon={faPenClip} />
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
                        <label className="btn btn-sm btn-outline-secondary action-button" htmlFor="pencil-btn-radio">
                            <FontAwesomeIcon color={annotationMode === AnnotationMode.PENCIL ? 'var(--bs-primary)' : undefined} className="font-awesome-icon" icon={faPencil} />
                            <span className="d-none d-xl-inline me-1">Pencil</span>
                        </label>
                    </div>
                </div>
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary action-button"
                        disabled={
                            !currentSelectedCellPosition ||
                            !availableHints.find((hint) => pointsAreEqual(hint.position, currentSelectedCellPosition!))
                        }
                        onPointerDown={onHintClick}
                    >
                        <FontAwesomeIcon color='var(--bs-primary)' className="font-awesome-icon" icon={faLightbulb} />
                        <span className="d-none me-1 d-xl-inline">Hint</span>
                        <span className="badge text-bg-success">{numberOfHintsGiven}</span>
                    </button>
                </div>
            </div>
            <div className="my-3">
                <NumPadComponent onNumberPressed={onNumberPressed} />
            </div>
            <div className="d-grid gap-2 d-md-flex mx-2 justify-content-between ">
                <button className="btn btn-sm btn-warning action-button me-md-2" type="button"
                    onPointerDown={() => emitRestart()}>
                    <FontAwesomeIcon color='var(--bs-primary)' className="font-awesome-icon" icon={faArrowRotateRight} />
                    <span className="d-none me-1 d-xl-inline">Restart</span>
                </button>
                <button className="btn btn-sm btn-outline-primary action-button" type="button">
                    <FontAwesomeIcon color='var(--bs-info)' className="font-awesome-icon" icon={faGear} />
                    <span className="d-none me-1 d-xl-inline">Settings</span>
                </button>
            </div>
        </div>
    )
}
