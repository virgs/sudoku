import { createContext, useEffect, useRef } from 'react'
import './App.css'
import { BoardComponent } from './components/BoardComponent'
import { KillerBoardCreator } from './engine/killer/KillerBoardCreator'
import { fileContent } from './engine/killer/SudokuKillerFile'
import { AnnotationMode } from './input/AnnotationMode'
import { emitCurrentValueErased, emitNumberPressed } from './input/Events'
import { UserInput, mapInputToNumber, mapKeyToUserInput } from './input/UserInput'

const board = new KillerBoardCreator().createBoardFromText(fileContent)
export const BoardContext = createContext(board);

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
                    annotationMode: AnnotationMode.PENCIL
                })
            else if (input === UserInput.DELETE) {
                emitCurrentValueErased()
            }
        }
    }

    return (
        <div id="app" ref={appRef}
            tabIndex={0}
            onKeyUp={(event) => handleKeyPress(event.code)}>
            <BoardContext.Provider value={board}>
                <BoardComponent />
            </BoardContext.Provider>
        </div>
    )
}

export default App
