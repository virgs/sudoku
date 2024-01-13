import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../../App'
import { CellType } from '../../engine/types/CellType'
import { EventEmitter } from '../../eventEmitter/EventEmitter'
import { Events } from '../../eventEmitter/Events'
import { Point, pointsAreEqual } from '../../math/Point'
import './GridCellComponent.css'

type GridCellComponentProps = {
    position: Point
    cell: CellType
}

export function GridCellComponent(props: GridCellComponentProps) {
    const defaultClass = 'grid-cell'
    const board = useContext(BoardContext);
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

    const onCellClick = () => EventEmitter.emit(Events.CELL_SELECTED, { cell: props.cell, position: props.position })
    EventEmitter.on(Events.CELL_SELECTED, (data: { cell: CellType; position: Point }) => {
        setSelected(false)
        setHighlighted(false)
        if (pointsAreEqual(props.position, data.position)) {
            setSelected(true)
        }
        if (board.shouldHighlightCell(data.position, props.position)) {
            setHighlighted(true)
        }
    })
    return (
        <div onPointerDown={() => onCellClick()} className={classList}>
            {board.renderCellComponent({
                cell: props.cell,
                position: props.position,
            })}
        </div>
    )
}
