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
} from '../../../Events'
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
    const [sameValueCellSelected, setSameValueCellSelected] = useState<boolean>(false)
    const [classList, setClassList] = useState<string>(defaultClass)

    useEffect(() => {
        const list = [defaultClass]
        if (selected) {
            list.push('selected')
        }
        if (highlighted) {
            list.push('highlighted')
        }
        if (sameValueCellSelected) {
            list.push('same-value')
        }
        setClassList(list.join(' '))
    }, [selected, highlighted, sameValueCellSelected])

    useCurrentValueErasedListener(() => {
        if (selected) {
            setRevealed(false)
        }
    })

    useCellValueSetListener((payload: CellValueSetEventType) => {
        if (pointsAreEqual(payload.position, props.position)) {
            setRevealed(true)
        } else if (payload.value === props.cell.answer && revealed) {
            setSameValueCellSelected(true)
        }
    })

    const checkBorderStyle = () => {
        const style: React.CSSProperties = {}

        const regions: Point[][] = board.getCellRegions(props.position)
        const sharesRegionWithCellAt = (point: Point) =>
            regions.some((region: Point[]) => region.some((cell: Point) => pointsAreEqual(cell, point)))

        if (sharesRegionWithCellAt({ x: props.position.x, y: props.position.y + 1 })) {
            style.borderBottom = 'none'
        }
        if (sharesRegionWithCellAt({ x: props.position.x, y: props.position.y - 1 })) {
            style.borderTop = 'none'
        }
        if (sharesRegionWithCellAt({ x: props.position.x + 1, y: props.position.y })) {
            style.borderRight = 'none'
        }
        if (sharesRegionWithCellAt({ x: props.position.x - 1, y: props.position.y })) {
            style.borderLeft = 'none'
        }
        return style
    }

    useCellSelectedListener((payload: CellSelectedEventType) => {
        setSelected(false)
        setHighlighted(false)
        setSameValueCellSelected(false)
        if (pointsAreEqual(props.position, payload.position)) {
            setSelected(true)
        } else if (payload.value === props.cell.answer && revealed) {
            setSameValueCellSelected(true)
        } else if (board.cellsShareSameRegion(payload.position, props.position)) {
            setHighlighted(true)
        }
    })
    return (
        <div
            onPointerDown={() =>
                emitCellSelected({ position: props.position, value: revealed ? props.cell.answer : undefined })
            }
            className={classList}
            style={checkBorderStyle()}
        >
            {board.renderCellComponent({
                selected: selected,
                cell: props.cell,
                position: props.position,
            })}
        </div>
    )
}
