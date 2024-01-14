import { useContext, useState } from "react"
import { BoardContext } from "../../App"
import { AnnotationMode } from "../../input/AnnotationMode"
import { emitAnnotationModeChanged, emitNumberPressed } from "../../input/Events"
import { NumPadComponent } from "./NumPadComponent"
import "./UserInputComponent.css"

export function UserInputComponent() {
    const board = useContext(BoardContext)
    const [annotationMode, setAnnotationMode] = useState<AnnotationMode>(AnnotationMode.PENCIL)


    const onNumberPressed = (value: number) => {
        emitNumberPressed({
            value: value,
            annotationMode: annotationMode,
        })
    }

    const onAnnotationModeButtonClick = (annotationMode: AnnotationMode) => {
        setAnnotationMode(annotationMode)
        emitAnnotationModeChanged(annotationMode)
    }

    return (<div id="user-input-component">
        <div className="row justify-content-between my-2 g-0">
            <div className="col-auto">
                <button type="button" className="btn btn-secondary">Erase</button>
            </div>
            <div className="col-auto">
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="pen-btn-radio" autoComplete="off"
                        checked={annotationMode === AnnotationMode.PEN} onChange={() => onAnnotationModeButtonClick(AnnotationMode.PEN)} />
                    <label className="btn btn-secondary" htmlFor="pen-btn-radio">Pen</label>
                    <input type="radio" className="btn-check" name="btnradio" id="pencil-btn-radio" autoComplete="off"
                        checked={annotationMode === AnnotationMode.PENCIL} onChange={() => onAnnotationModeButtonClick(AnnotationMode.PENCIL)} />
                    <label className="btn btn-secondary" htmlFor="pencil-btn-radio">Pencil</label>
                </div>
            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-secondary">Hint</button>
            </div>
        </div>
        <NumPadComponent onNumberPressed={onNumberPressed} />
        <div className="d-grid gap-2 d-block">
            <button className="btn btn-info" type="button">Restart</button>
        </div>
    </div>
    )

}
