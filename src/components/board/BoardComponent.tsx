import { useContext, useState } from 'react'
import { BoardContext } from '../../App'
import { Board } from '../../engine/Board'
import { CellValueSetEventType, emitAllCellsRevealed, useCellValueSetListener, useGameStartedListener } from '../../Events'
import { Point, pointsAreEqual } from '../../math/Point'
import './BoardComponent.css'
import { GridComponent } from './grid/GridComponent'

function getNotRevealedYetCells(board: Board) {
    const notRevealedCells: Point[] = []
    board.grid.cells.forEach((cellLines, y) =>
        cellLines.forEach((cell, x) => {
            if (!cell.revealed) {
                notRevealedCells.push({
                    x: x,
                    y: y,
                })
            }
        })
    )
    return notRevealedCells
}

export function BoardComponent() {
    const board = useContext(BoardContext)
    const [notAnsweredCells, setNotAnsweredCells] = useState<Point[]>(getNotRevealedYetCells(board))

    useCellValueSetListener((data: CellValueSetEventType) => {
        if (data.valueIsCorrect) {
            const nextNotAnsweredCells = notAnsweredCells.filter(
                (cellPosition) => !pointsAreEqual(cellPosition, data.position)
            )
            if (nextNotAnsweredCells.length <= 0) {
                emitAllCellsRevealed()
            }
            setNotAnsweredCells(nextNotAnsweredCells)
        }
    })

    return (
        <div className="board-component mx-auto">
            <GridComponent />
        </div>
    )
}
