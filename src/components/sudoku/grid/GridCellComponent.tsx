import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../../../App'
import { CellType } from '../../../engine/types/CellType'
import { Point, pointsAreEqual } from '../../../math/Point'
import './GridCellComponent.css'
import { emitCellSelected, useCellSelectedListener } from '../../../input/Events'

type GridCellComponentProps = {
    position: Point
    cell: CellType
}

export function GridCellComponent(props: GridCellComponentProps) {
    const board = useContext(BoardContext)
    const defaultClass = 'grid-cell'
    const [selected, setSelected] = useState<boolean>(false)
    const [highlighted, setHighlighted] = useState<boolean>(false)
    const [classList, setClassList] = useState<string>(defaultClass)

    useEffect(() => {
        const list = [defaultClass]
        if (selected) {
            list.push('selected')
        }
        if (highlighted) {
            list.push('highlighted')
        }
        setClassList(list.join(' '))
    }, [selected, highlighted])

    useCellSelectedListener((data: { cell: CellType; position: Point }) => {
        setSelected(false)
        setHighlighted(false)
        if (pointsAreEqual(props.position, data.position)) {
            setSelected(true)
        } else if (board.shouldHighlightCell(data.position, props.position)) {
            setHighlighted(true)
        }
    })
    return (
        <div
            onPointerDown={() => emitCellSelected({ cell: props.cell, position: props.position })}
            className={classList}
        >
            {board.renderCellComponent({
                selected: selected,
                cell: props.cell,
                position: props.position,
            })}
        </div>
    )
}
