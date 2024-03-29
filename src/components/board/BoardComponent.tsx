import { useContext, useState } from 'react'
import { BoardContext } from '../../App'
import { CellValueSetEventType, emitAllCellsRevealed, useCellValueSetListener } from '../../Events'
import { Board } from '../../engine/Board'
import { Point, pointsAreEqual } from '../../math/Point'
import './BoardComponent.css'
import { GridComponent } from './grid/GridComponent'

const endGameThreshold = 0

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
            if (nextNotAnsweredCells.length <= endGameThreshold) {
                emitAllCellsRevealed({ lastRevealedCellPosition: data.position })
            }
            setNotAnsweredCells(nextNotAnsweredCells)
        }
    })

    return (
        <div className="board-component mx-auto p-1 p-lg-2">
            <GridComponent />
        </div>
    )
}
