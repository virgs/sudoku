import { useContext, useState } from 'react';
import { BoardContext } from '../../App';
import { CellValueSetEventType, useCellValueSetListener } from '../../input/Events'
import './BoardComponent.css'
import { GridComponent } from './grid/GridComponent'
import { Point, pointsAreEqual } from '../../math/Point';

export function BoardComponent() {
    const board = useContext(BoardContext)
    const notRevealedCells: Point[] = []
    board.grid.cells
        .forEach((cellLines, y) => cellLines
            .forEach((cell, x) => {
                if (!cell.revealed) {
                    notRevealedCells.push({
                        x: x,
                        y: y
                    })
                }
            }))

    const [notAnsweredCells, setNotAnsweredCells] = useState<Point[]>(notRevealedCells)

    useCellValueSetListener((data: CellValueSetEventType) => {
        console.log(data.valueIsCorrect)
        if (data.valueIsCorrect) {
            const removed = notAnsweredCells.filter(cellPosition => !pointsAreEqual(cellPosition, data.position))
            console.log(removed.length)
            if (removed.length === 0) {
                //Game won
                console.log('game won')
            }
            setNotAnsweredCells(removed)
        }
    });

    return (
        <div className="board-component mx-auto">
            <GridComponent />
        </div>
    )
}
