import { KillerGridType } from '../../engine/killer/types/KillerGridType'
import { KillerGridCage } from './KillerGridCage'
import './KillerGridComponent.css'

export type KillerGridComponentProps = {
    grid: KillerGridType,
}

export function KillerGridComponent(props: KillerGridComponentProps) {

    const createBlocks = () => {
        const blocksDimension: Point = { x: 3, y: 3 }
        return <div className="grid-component">
            {Array.from(Array(blocksDimension.y))
                .map((_, blockLine) => {
                    return <div className="grid-block-line mx-auto">
                        {Array.from(Array(blocksDimension.y))
                            .map((_, blockColumn) => {
                                return <div className="grid-block">
                                    {createCells({ y: blockLine, x: blockColumn })}
                                </div>
                            })
                        }
                    </div>
                })}
        </div>

    }

    const createCells = (block: Point) => {
        return <div>
            {Array.from(Array(blocksDimension.y))
                .map((_, cellLine) => {
                    return <div className="grid-block-line mx-auto">
                        {Array.from(Array(blocksDimension.y))
                            .map((_, cellCol) => {
                                const position: Point = {
                                    y: block.y * blocksDimension.y + cellLine,
                                    x: block.x * blocksDimension.x + cellCol
                                }
                                const currentCell = props.grid.cells[position.y][position.y]
                                return <div className="grid-cell">
                                    <KillerGridCage cell={currentCell} cage={props.grid.cages
                                        .find(cage => cage.cells
                                            .some(cell => cell.x === position.x && cell.y === position.y))!}>
                                    </KillerGridCage>
                                </div>
                            })
                        }
                    </div>
                })}
        </div>
    }

    const blocksDimension: Point = { x: 3, y: 3 }
    return <div className='grid-component'>
        {createBlocks()}
    </div>
}
