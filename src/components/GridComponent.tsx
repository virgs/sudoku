import "./GridComponent.css"
import { Point } from "../math/Point"
import { CellComponentProps } from "../wrapper/BoardWrapper"
import { CellWrapper } from "../wrapper/CellWrapper"
import { GridWrapper } from "../wrapper/GridWrapper"

export type GridComponentProps = {
    gridWrapper: GridWrapper
    renderCellComponent: (cellComponentProps: CellComponentProps) => JSX.Element;
    onCellClick: (cell: CellWrapper) => void
}

export function GridComponent(props: GridComponentProps) {
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
                        const cellComponent = props.renderCellComponent({ cellWrapper: currentCell, onCellClick: props.onCellClick })
                        return (
                            <div key={cellCol} className="grid-cell">
                                {cellComponent}
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
