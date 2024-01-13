import { useContext } from 'react'
import { BoardContext } from '../../App'
import { Point } from '../../math/Point'
import { GridCellComponent } from './GridCellComponent'
import './GridComponent.css'

export function GridComponent() {
    const board = useContext(BoardContext);

    const blocksDimension: Point = { x: 3, y: 3 }

    const createBlocks = () => {
        return (
            <div className="grid-component">
                {Array.from(Array(blocksDimension.y)).map((_, blockLine) => {
                    return (
                        <div key={blockLine} className="grid-line mx-auto">
                            {Array.from(Array(blocksDimension.y)).map((_, blockColumn) => {
                                return (
                                    <div key={blockColumn} className="grid-block">
                                        {createBlock({ y: blockLine, x: blockColumn })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

    const createBlock = (block: Point) => {
        return Array.from(Array(blocksDimension.y)).map((_, cellLine) => {
            return (
                <div key={cellLine} className="grid-block-line mx-auto">
                    {Array.from(Array(blocksDimension.y)).map((_, cellCol) => {
                        const position: Point = {
                            y: block.y * blocksDimension.y + cellLine,
                            x: block.x * blocksDimension.x + cellCol,
                        }
                        const currentCell = board.grid.cells[position.y][position.x]
                        return (
                            <GridCellComponent
                                key={cellCol}
                                cell={currentCell}
                                position={position}
                            ></GridCellComponent>
                        )
                    })}
                </div>
            )
        })
    }

    return createBlocks()
}
