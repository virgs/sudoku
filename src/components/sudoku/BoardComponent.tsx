import { useContext, useState } from 'react';
import { BoardContext } from '../../App';
import { Board } from '../../engine/Board';
import { CellValueSetEventType, useCellValueSetListener } from '../../input/Events';
import { Point, pointsAreEqual } from '../../math/Point';
import './BoardComponent.css';
import { GridComponent } from './grid/GridComponent';

function getNotRevealedYetCells(board: Board) {
    const notRevealedCells: Point[] = [];
    board.grid.cells
        .forEach((cellLines, y) => cellLines
            .forEach((cell, x) => {
                if (!cell.revealed) {
                    notRevealedCells.push({
                        x: x,
                        y: y
                    });
                }
            }));
    return notRevealedCells;
}


export function BoardComponent() {
    const board = useContext(BoardContext)
    const [notAnsweredCells, setNotAnsweredCells] = useState<Point[]>(getNotRevealedYetCells(board))

    useCellValueSetListener((data: CellValueSetEventType) => {
        if (data.valueIsCorrect) {
            const removed = notAnsweredCells.filter(cellPosition => !pointsAreEqual(cellPosition, data.position))
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
