import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import { ControlsComponent } from './components/controls/ControlsComponent'
import { Header } from './components/controls/Header'
import { BoardComponent } from './components/sudoku/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'
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

const board = new KillerBoardCreator().createBoardFromText(fileContent)
export const BoardContext = createContext(board)

function App() {
    const [annotationMode, setAnnotationMode] = useState<AnnotationMode>(AnnotationMode.PEN)
    const [currentSelectedCell, setCurrentSelectedCell] = useState<CellSelectedEventType | undefined>()

    const appRef = useRef(null)
    useEffect(() => {
        //@ts-ignore
        appRef.current?.focus()
    })

    useCellSelectedListener((payload) => setCurrentSelectedCell(payload))
    useAnnotationModeChangedListener((annotationMode) => setAnnotationMode(annotationMode))

    const handleKeyPress = (keyCode: string) => {
        let input = mapKeyToUserInput(keyCode)
        if (input !== undefined) {
            const mappedToNumber = mapInputToNumber(input)
            if (mappedToNumber && board.isNumberAllowed(mappedToNumber))
                emitNumberPressed({
                    value: mappedToNumber,
                    annotationMode: annotationMode,
                })
            else if (input === UserInput.DELETE) {
                emitCurrentValueErased()
            } else if (input === UserInput.ALTERNATE_ANNOTATION_MODE) {
                const newAnnotationMode =
                    annotationMode === AnnotationMode.PEN ? AnnotationMode.PENCIL : AnnotationMode.PEN
                setAnnotationMode(newAnnotationMode)
                emitAnnotationModeChanged(newAnnotationMode)
            } else if (isArowKey(input)) {
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
        }
        return input
    }

    return (
        <div id="app" className="p-2" ref={appRef} tabIndex={0}
            onKeyDown={event => {
                if (mapKeyToUserInput(event.code)) {
                    event.preventDefault()
                }
            }}
            onKeyUp={(event) => {
                event.preventDefault()
                return handleKeyPress(event.code)
            }}>
            <BoardContext.Provider value={board}>
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
                </div>
            </BoardContext.Provider>
        </div>
    )
}

export default App
