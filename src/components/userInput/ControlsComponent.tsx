import { useEffect, useState } from "react"
import { AnnotationMode } from "../../input/AnnotationMode"
import { emitAnnotationModeChanged, emitCurrentValueErased, emitNumberPressed, useAnnotationModeChangedListener } from "../../input/Events"
import { NumPadComponent } from "./NumPadComponent"
import "./ControlsComponent.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateRight, faEraser, faLightbulb, faPenClip, faPencil } from "@fortawesome/free-solid-svg-icons"

export function ControlsComponent() {
    const [annotationMode, setAnnotationMode] = useState<AnnotationMode>(AnnotationMode.PENCIL)

    const onNumberPressed = (value: number) => {
        emitNumberPressed({
            value: value,
            annotationMode: annotationMode,
        })
    }

    useEffect(() => {
        emitAnnotationModeChanged(annotationMode)
    }, [])

    useAnnotationModeChangedListener((annotationMode) => setAnnotationMode(annotationMode))

    const onAnnotationModeButtonClick = (annotationMode: AnnotationMode) => {
        setAnnotationMode(annotationMode)
        emitAnnotationModeChanged(annotationMode)
    }

    return (<div id="controls-component">
        <div className="row justify-content-between g-0">
            <div className="col-auto">
                <button type="button" className="btn btn-sm btn-secondary action-button" onPointerDown={() => emitCurrentValueErased()}>
                    <FontAwesomeIcon className="font-awesome-icon" icon={faEraser} />
                    <span className="d-none d-md-inline">Erase</span>
                </button>
            </div>
            <div className="col" style={{ textAlign: 'center' }}>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="pen-btn-radio" autoComplete="off"
                        checked={annotationMode === AnnotationMode.PEN} onChange={() => onAnnotationModeButtonClick(AnnotationMode.PEN)} />
                    <label className="btn btn-sm btn-secondary action-button" htmlFor="pen-btn-radio">
                        <FontAwesomeIcon className="font-awesome-icon" icon={faPenClip} />
                        <span className="d-none d-md-inline">Pen</span>
                    </label>
                    <input type="radio" className="btn-check" name="btnradio" id="pencil-btn-radio" autoComplete="off"
                        checked={annotationMode === AnnotationMode.PENCIL} onChange={() => onAnnotationModeButtonClick(AnnotationMode.PENCIL)} />
                    <label className="btn btn-sm btn-secondary action-button" htmlFor="pencil-btn-radio">
                        <FontAwesomeIcon className="font-awesome-icon" icon={faPencil} />
                        <span className="d-none d-md-inline">Pencil</span>
                    </label>
                </div>
            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-sm btn-secondary action-button">
                    <FontAwesomeIcon className="font-awesome-icon" icon={faLightbulb} />
                    <span className="d-none d-md-inline">Hint</span>
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

