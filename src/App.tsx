import { createContext, useEffect, useRef } from 'react'
import './App.css'
import { BoardComponent } from './components/sudoku/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'
import { AnnotationMode } from './input/AnnotationMode'
import { emitCurrentValueErased, emitNumberPressed } from './input/Events'
import { UserInput, mapInputToNumber, mapKeyToUserInput } from './input/UserInput'
import { UserInputComponent } from './components/userInput/UserInputComponent'

const board = new KillerBoardCreator().createBoardFromText(fileContent)
export const BoardContext = createContext(board)

function App() {
    const appRef = useRef(null)

    useEffect(() => {
        //@ts-ignore
        appRef.current?.focus()
    })

    const handleKeyPress = (keyCode: string) => {
        let input = mapKeyToUserInput(keyCode)
        if (input !== undefined) {
            const mappedToNumber = mapInputToNumber(input)
            if (mappedToNumber && board.isNumberAllowed(mappedToNumber))
                emitNumberPressed({
                    value: mappedToNumber,
                    annotationMode: AnnotationMode.PENCIL,
                })
            else if (input === UserInput.DELETE) {
                emitCurrentValueErased()
            }
        }
    }

    return (
        <div id="app" className='mx-auto' ref={appRef} tabIndex={0} onKeyUp={(event) => handleKeyPress(event.code)}>
            <div id="keyHandler" style={{ height: '100%' }}>
                <BoardContext.Provider value={board}>
                    <div className="container-fluid mt-lg-5">
                        <div className="row justify-content-evenly" style={{ height: '100%' }}>
                            <div className="col-4 p-0 align-self-center">
                                <UserInputComponent></UserInputComponent>
                            </div>
                            <div className="col-6 p-0">
                                <BoardComponent />
                            </div>
                        </div>
                    </div>
                </BoardContext.Provider>
            </div>
        </div >
    )
}

export default App
