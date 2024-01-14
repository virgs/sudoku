import { faArrowRotateRight, faEraser, faLightbulb, faPenClip, faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react"
import { BoardContext } from "../../App"
import { Board } from "../../engine/Board"
import { AnnotationMode } from "../../input/AnnotationMode"
import { CellValueSetEventType, emitAnnotationModeChanged, emitCurrentValueErased, emitNumberPressed, useAnnotationModeChangedListener, useCellSelectedListener, useCellValueSetListener } from "../../input/Events"
import { Point, pointsAreEqual } from "../../math/Point"
import "./ControlsComponent.css"
import { NumPadComponent } from "./NumPadComponent"
import { KillerBoard } from "../../engine/killer/KillerBoard"

type Hint = {
    position: Point
    answer: number
}

function createHints(board: Board) {
    const revealed: Hint[] = [];
    board.grid.cells
        .forEach((cellLines, y) => cellLines
            .forEach((cell, x) => {
                revealed.push({
                    position: {
                        x: x,
                        y: y
                    },
                    answer: cell.answer
                });
            }));
    return revealed;
}

export function ControlsComponent() {
    const board = useContext(BoardContext)

    const [numberOfRemainingHints, setNumberOfRemainingHints] = useState<number>(3)
    const [annotationMode, setAnnotationMode] = useState<AnnotationMode>(AnnotationMode.PENCIL)
    const [availableHints, setAvailableHints] = useState<Hint[]>(createHints(board))
    const [currentSelectedCellPosition, setCurrentSelectedCellPosition] = useState<Point | undefined>()

    useCellSelectedListener(payload => setCurrentSelectedCellPosition(payload.position))

    const onNumberPressed = (value: number) => {
        emitNumberPressed({
            value: value,
            annotationMode: annotationMode,
        })
    }

    useCellValueSetListener((data: CellValueSetEventType) => {
        if (data.valueIsCorrect) {
            setAvailableHints(availableHints.filter(hint => !pointsAreEqual(hint.position, data.position)))
        }
    });

    useEffect(() => {
        emitAnnotationModeChanged(annotationMode)
    }, [])

    useAnnotationModeChangedListener((annotationMode) => setAnnotationMode(annotationMode))

    const onAnnotationModeButtonClick = (annotationMode: AnnotationMode) => {
        setAnnotationMode(annotationMode)
        emitAnnotationModeChanged(annotationMode)
    }

    const onHintClick = () => {
        setNumberOfRemainingHints(numberOfRemainingHints - 1)
        emitNumberPressed({
            value: availableHints.find(hint => pointsAreEqual(hint.position, currentSelectedCellPosition!))!.answer,
            annotationMode: AnnotationMode.PEN,
            hint: true
        })
    }

    return (<div id="controls-component">
        <div className="row justify-content-between g-0">
            <div className="col-auto">
                <button type="button" className="btn btn-sm btn-secondary action-button" onPointerDown={() => emitCurrentValueErased()}>
                    <FontAwesomeIcon className="font-awesome-icon" icon={faEraser} />
                    <span className="d-none d-xl-inline">Erase</span>
                </button>
            </div>
            <div className="col" style={{ textAlign: 'center' }}>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="pen-btn-radio" autoComplete="off"
                        checked={annotationMode === AnnotationMode.PEN} onChange={() => onAnnotationModeButtonClick(AnnotationMode.PEN)} />
                    <label className="btn btn-sm btn-secondary action-button" htmlFor="pen-btn-radio">
                        <FontAwesomeIcon className="font-awesome-icon" icon={faPenClip} />
                        <span className="d-none d-xl-inline">Pen</span>
                    </label>
                    <input type="radio" className="btn-check" name="btnradio" id="pencil-btn-radio" autoComplete="off"
                        checked={annotationMode === AnnotationMode.PENCIL} onChange={() => onAnnotationModeButtonClick(AnnotationMode.PENCIL)} />
                    <label className="btn btn-sm btn-secondary action-button" htmlFor="pencil-btn-radio">
                        <FontAwesomeIcon className="font-awesome-icon" icon={faPencil} />
                        <span className="d-none d-xl-inline">Pencil</span>
                    </label>
                </div>
            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-sm btn-secondary action-button"
                    disabled={numberOfRemainingHints <= 0 || !currentSelectedCellPosition || !availableHints.find(hint => pointsAreEqual(hint.position, currentSelectedCellPosition!))}
                    onPointerDown={onHintClick}>
                    <FontAwesomeIcon className="font-awesome-icon" icon={faLightbulb} />
                    <span className="d-none d-xl-inline">Hint</span>
                    <span className="badge text-bg-success">{numberOfRemainingHints}</span>
                </button>
            </div>
        </div>
        <div className="my-3">
            <NumPadComponent onNumberPressed={onNumberPressed} />
        </div>
        <div className="d-grid d-block">
            <button className="btn btn-warning" type="button">
                <FontAwesomeIcon className="font-awesome-icon" icon={faArrowRotateRight} />
                Restart</button>
        </div>
    </div>
    )

}
