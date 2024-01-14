import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import { BoardComponent } from './components/sudoku/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'
import { AnnotationMode } from './input/AnnotationMode'
import { emitAnnotationModeChanged, emitCellSelected, emitCurrentValueErased, emitNumberPressed, useAnnotationModeChangedListener, useCellSelectedListener } from './input/Events'
import { UserInput, isArowKey, mapInputToNumber, mapKeyToUserInput } from './input/UserInput'
import { ControlsComponent } from './components/userInput/ControlsComponent'
import { Point } from './math/Point'

const board = new KillerBoardCreator().createBoardFromText(fileContent)
export const BoardContext = createContext(board)

function App() {
    const [annotationMode, setAnnotationMode] = useState<AnnotationMode>(AnnotationMode.PEN)
    const [currentSelectedCellPosition, setCurrentSelectedCellPosition] = useState<Point | undefined>()

    const appRef = useRef(null)
    useEffect(() => {
        //@ts-ignore
        appRef.current?.focus()
    })

    useCellSelectedListener(payload => setCurrentSelectedCellPosition(payload.position))
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
                const newAnnotationMode = (annotationMode === AnnotationMode.PEN) ? AnnotationMode.PENCIL : AnnotationMode.PEN
                setAnnotationMode(newAnnotationMode)
                emitAnnotationModeChanged(newAnnotationMode)
            } else if (isArowKey(input)) {
                if (currentSelectedCellPosition) {
                    const nextPosition = {
                        x: currentSelectedCellPosition.x,
                        y: currentSelectedCellPosition.y
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
                            position: nextPosition
                        })
                    }
                }
            }
        }
    }

    return (
        <div id="app" className='p-2' ref={appRef} tabIndex={0} onKeyUp={(event) => handleKeyPress(event.code)}>
            <BoardContext.Provider value={board}>
                <div className="container-lg p-0">
                    <div className="row justify-content-center gy-3">
                        <div className="col-12 col-sm-6 col-md-7">
                            <BoardComponent />
                        </div>
                        <div className="col-12 col-sm-6 col-md-5 col-lg-4 align-self-start px-3 px-xl-4">
                            <ControlsComponent></ControlsComponent>
                        </div>
                    </div>
                </div>
            </BoardContext.Provider>
        </div >
    )
}

export default App

