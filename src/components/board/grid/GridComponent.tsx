import { useContext } from 'react'
import { BoardContext } from '../../../App'
import { CellType } from '../../../engine/types/CellType'
import { GridCellComponent } from './GridCellComponent'
import './GridComponent.css'

export function GridComponent() {
    const board = useContext(BoardContext)

    const createGrid = () => {
        return (
            <div className="grid-component">
                {board.grid.cells.map((cellsLine, y) => {
                    return (
                        <div key={y} className="grid-line" style={{ height: `calc(100% / ${board.grid.dimension.y})` }}>
                            {cellsLine.map((cell: CellType, x: number) => {
                                return (
                                    <GridCellComponent
                                        key={`${y},${x}`}
                                        cell={cell}
                                        position={{ y, x }}
                                    ></GridCellComponent>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

    return createGrid()
}
