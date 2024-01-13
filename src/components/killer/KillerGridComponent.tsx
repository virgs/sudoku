import { KillerGridType } from '../../engine/killer/types/KillerGridType'
import { Point, pointsAreEqual } from '../../math/Point'
import { CellWrapper } from '../../wrapper/CellWrapper'
import { GridWrapper } from '../../wrapper/GridWrapper'
import { KillerGridCageComponent } from './KillerGridCageComponent'
import './KillerGridComponent.css'

export type KillerGridComponentProps = {
    gridWrapper: GridWrapper
    onCellClick: (cell: CellWrapper) => void
}

export function KillerGridComponent(props: KillerGridComponentProps) {
    const createBlocks = () => {
        const blocksDimension: Point = { x: 3, y: 3 }
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

    const cages = (props.gridWrapper.grid as KillerGridType).cages

    const createBlock = (block: Point) => {
        return Array.from(Array(blocksDimension.y)).map((_, cellLine) => {
            return (
                <div key={cellLine} className="grid-block-line mx-auto">
                    {Array.from(Array(blocksDimension.y)).map((_, cellCol) => {
                        const position: Point = {
                            y: block.y * blocksDimension.y + cellLine,
                            x: block.x * blocksDimension.x + cellCol,
                        }
                        const currentCell = props.gridWrapper.cellsWrapper[position.y][position.x]
                        return (
                            <div key={cellCol} className="grid-cell">
                                <KillerGridCageComponent
                                    onCellClick={props.onCellClick}
                                    cellWrapper={currentCell}
                                    cage={
                                        cages.find((cage) => cage.cells.some((cell) => pointsAreEqual(cell, position)))!
                                    }
                                ></KillerGridCageComponent>
                            </div>
                        )
                    })}
                </div>
            )
        })
    }

    const blocksDimension: Point = { x: 3, y: 3 }
    return createBlocks()
}
