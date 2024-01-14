import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import { BoardComponent } from './components/sudoku/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'
import { AnnotationMode } from './input/AnnotationMode'
import { emitAnnotationModeChanged, emitCurrentValueErased, emitNumberPressed, useAnnotationModeChangedListener } from './input/Events'
import { UserInput, mapInputToNumber, mapKeyToUserInput } from './input/UserInput'
import { ControlsComponent } from './components/userInput/ControlsComponent'

const board = new KillerBoardCreator().createBoardFromText(fileContent)
export const BoardContext = createContext(board)

function App() {
    const [annotationMode, setAnnotationMode] = useState<AnnotationMode>(AnnotationMode.PEN)

    const appRef = useRef(null)

    useEffect(() => {
        //@ts-ignore
        appRef.current?.focus()
    })

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
            }
        }
    }

    return (
        <div id="app" className='p-2' ref={appRef} tabIndex={0} onKeyUp={(event) => handleKeyPress(event.code)}>
            <BoardContext.Provider value={board}>
                <div className="container-lg p-0">
                    <div className="row justify-content-center g-3">
                        <div className="col-12 col-sm-6">
                            <BoardComponent />
                        </div>
                        <div className="col-12 col-sm-5 col-lg-4 align-self-start mx-3">
                            <ControlsComponent></ControlsComponent>
                        </div>
                    </div>
                </div>
            </BoardContext.Provider>
        </div >
    )
}

export default App

