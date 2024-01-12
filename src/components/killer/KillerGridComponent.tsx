import './KillerGridComponent.css'
import { KillerGridType } from '../../engine/killer/types/KillerGridType'
import { Point, pointsAreEqual } from '../../math/Point'
import { KillerGridCage } from './KillerGridCage'
import { CellType } from '../../engine/types/CellType'

export type KillerGridComponentProps = {
    grid: KillerGridType,
    onCellClick: (cell: CellType) => void
}

export function KillerGridComponent(props: KillerGridComponentProps) {
    const createBlocks = () => {
        const blocksDimension: Point = { x: 3, y: 3 }
        return <div className="grid-component">
            {Array.from(Array(blocksDimension.y))
                .map((_, blockLine) => {
                    return <div key={blockLine} className="grid-line mx-auto">
                        {Array.from(Array(blocksDimension.y))
                            .map((_, blockColumn) => {
                                return <div key={blockColumn} className="grid-block">
                                    {createBlock({ y: blockLine, x: blockColumn })}
                                </div>
                            })
                        }
                    </div>
                })}
        </div>

    }

    const createBlock = (block: Point) => {
        return Array.from(Array(blocksDimension.y))
            .map((_, cellLine) => {
                return <div key={cellLine} className="grid-block-line mx-auto">
                    {Array.from(Array(blocksDimension.y))
                        .map((_, cellCol) => {
                            const position: Point = {
                                y: block.y * blocksDimension.y + cellLine,
                                x: block.x * blocksDimension.x + cellCol
                            }
                            const currentCell = props.grid.cells[position.y][position.x]
                            return <div key={cellCol} className="grid-cell">
                                <KillerGridCage onCellClick={props.onCellClick} position={position} cell={currentCell} cage={props.grid.cages
                                    .find(cage => cage.cells
                                        .some(cell => pointsAreEqual(cell, position)))!}>
                                </KillerGridCage>
                            </div>
                        })
                    }
                </div>
            })
    }

    const blocksDimension: Point = { x: 3, y: 3 }
    return createBlocks()
}
