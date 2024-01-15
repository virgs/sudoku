import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../../../App'
import { CellType } from '../../../engine/types/CellType'
import {
    CellSelectedEventType,
    CellValueSetEventType,
    emitCellSelected,
    useCellSelectedListener,
    useCellValueSetListener,
    useCurrentValueErasedListener,
} from '../../../input/Events'
import { Point, pointsAreEqual } from '../../../math/Point'
import './GridCellComponent.css'

type GridCellComponentProps = {
    position: Point
    cell: CellType
}

export function GridCellComponent(props: GridCellComponentProps) {
    const board = useContext(BoardContext)
    const defaultClass = 'grid-cell'
    const [revealed, setRevealed] = useState<boolean>(props.cell.revealed)
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

    useCurrentValueErasedListener(() => {
        if (selected) {
            setRevealed(false)
        }
    })

    useCellValueSetListener((payload: CellValueSetEventType) => {
        if (pointsAreEqual(payload.position, props.position)) {
            setRevealed(true)
        } else if (payload.value === props.cell.answer && revealed) {
            setHighlighted(true)
        }
    })
    useCellSelectedListener((payload: CellSelectedEventType) => {
        setSelected(false)
        setHighlighted(false)
        if (pointsAreEqual(props.position, payload.position)) {
            setSelected(true)
        } else if (board.cellsShareSameRegion(payload.position, props.position)) {
            setHighlighted(true)
        } else if (payload.value === props.cell.answer && revealed) {
            setHighlighted(true)
        }
    })
    return (
        <div
            onPointerDown={() =>
                emitCellSelected({ position: props.position, value: revealed ? props.cell.answer : undefined })
            }
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
