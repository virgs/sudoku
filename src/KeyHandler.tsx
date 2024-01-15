import { useContext, useEffect, useRef, useState } from 'react'
import './KeyHandler.css'
import { AnnotationMode } from './input/AnnotationMode'
import {
    CellSelectedEventType,
    emitAnnotationModeChanged,
    emitCellSelected,
    emitCurrentValueErased,
    emitNumberPressed,
    useAnnotationModeChangedListener,
    useCellSelectedListener,
} from './input/Events'
import { UserInput, isArowKey, mapInputToNumber, mapKeyToUserInput } from './input/UserInput'
import { GameContainer } from './components/GameContainer'
import { BoardContext } from './App'

export function KeyHandler() {
    const board = useContext(BoardContext)

    const [annotationMode, setAnnotationMode] = useState<AnnotationMode>(AnnotationMode.PEN)
    const [currentSelectedCell, setCurrentSelectedCell] = useState<CellSelectedEventType | undefined>()

    const appRef = useRef(null)
    useEffect(() => {
        //@ts-ignore
        appRef.current?.focus()
    })

    useCellSelectedListener((payload) => setCurrentSelectedCell(payload))
    useAnnotationModeChangedListener((annotationMode) => setAnnotationMode(annotationMode))

    function handleArrowKeyPressed(input: UserInput) {
        if (currentSelectedCell) {
            const nextPosition = {
                x: currentSelectedCell.position.x,
                y: currentSelectedCell.position.y,
            }
            if (input === UserInput.ARROW_DOWN) {
                nextPosition.y++
            } else if (input === UserInput.ARROW_UP) {
                nextPosition.y--
            } else if (input === UserInput.ARROW_LEFT) {
                nextPosition.x--
            } else if (input === UserInput.ARROW_RIGHT) {
                nextPosition.x++
            }
            if (board.isPositionInbound(nextPosition)) {
                emitCellSelected({
                    value: currentSelectedCell.value,
                    position: nextPosition,
                })
            }
        }
    }

    function handleAnnotationModePressed() {
        const newAnnotationMode = annotationMode === AnnotationMode.PEN ? AnnotationMode.PENCIL : AnnotationMode.PEN
        setAnnotationMode(newAnnotationMode)
        emitAnnotationModeChanged(newAnnotationMode)
    }

    function handleNumberPressed(mappedToNumber: number) {
        emitNumberPressed({
            value: mappedToNumber,
            annotationMode: annotationMode,
        })
    }

    const handleKeyPress = (keyCode: string) => {
        let input = mapKeyToUserInput(keyCode)
        if (input !== undefined) {
            const mappedToNumber = mapInputToNumber(input)
            if (mappedToNumber) {
                handleNumberPressed(mappedToNumber)
            } else if (input === UserInput.DELETE) {
                emitCurrentValueErased()
            } else if (input === UserInput.ALTERNATE_ANNOTATION_MODE) {
                handleAnnotationModePressed()
            } else if (isArowKey(input)) {
                handleArrowKeyPressed(input)
            }
        }
        return input
    }

    return (
        <div
            id="key-handler"
            ref={appRef}
            tabIndex={0}
            onKeyDown={(event) => {
                if (!event.metaKey && !event.shiftKey && !event.ctrlKey) {
                    if (mapKeyToUserInput(event.code)) {
                        event.preventDefault()
                    }
                }
            }}
            onKeyUp={(event) => {
                event.preventDefault()
                handleKeyPress(event.code)
            }}
        >
            <GameContainer></GameContainer>
        </div>
    )
}
