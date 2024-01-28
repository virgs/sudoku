import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../../../App'
import { CellType } from '../../../engine/types/CellType'
import {
    CellSelectedEventType,
    CellValueSetEventType,
    emitCellSelected,
    emitEndGameAnimationFinished,
    useAllCellsRevealedListener,
    useCellSelectedListener,
    useCellValueSetListener,
    useCurrentValueErasedListener,
} from '../../../Events'
import { Point, pointsAreEqual, squaredDistanceBetweenPoints } from '../../../math/Point'
import './GridCellComponent.css'
import { Board } from '../../../engine/Board'

type GridCellComponentProps = {
    position: Point
    cell: CellType
}

const checkBorderStyle = (board: Board, position: Point) => {
    const style: React.CSSProperties = {
        boxShadow: '0px 0px 0px 0.5px color-mix(in srgb, var(--bs-primary) 50%, transparent) inset'
    }
    const boxShadowSuffix = ' 0px 0px var(--bs-primary)'

    const regions: Point[][] = board.getCellRegions(position)
    const sharesRegionWithCellAt = (point: Point) =>
        regions.some((region: Point[]) => region.some((cell: Point) => pointsAreEqual(cell, point)))

    if (!sharesRegionWithCellAt({ x: position.x, y: position.y + 1 })) {
        style.boxShadow += ', 0px 1px' + boxShadowSuffix
    }
    if (!sharesRegionWithCellAt({ x: position.x, y: position.y - 1 })) {
        style.boxShadow += ', 0px -1px' + boxShadowSuffix
    }
    if (!sharesRegionWithCellAt({ x: position.x + 1, y: position.y })) {
        style.boxShadow += ', 1px 0px' + boxShadowSuffix
    }
    if (!sharesRegionWithCellAt({ x: position.x - 1, y: position.y })) {
        style.boxShadow += ', -1px 0px' + boxShadowSuffix
    }
    return style
}

export function GridCellComponent(props: GridCellComponentProps) {
    const board = useContext(BoardContext)
    const defaultClass = 'grid-cell'
    const [style, setStyle] = useState<React.CSSProperties>(checkBorderStyle(board, props.position))
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

    useAllCellsRevealedListener((payload) => {
        const animationDuration = 1500
        const biggestDistance = squaredDistanceBetweenPoints({ x: 0, y: 0 }, board.grid.dimension)
        const distance = squaredDistanceBetweenPoints(payload.lastRevealedCellPosition, props.position)
        const delay = (distance / biggestDistance) * animationDuration
        if (pointsAreEqual(payload.lastRevealedCellPosition, props.position)) {
            setTimeout(() => emitEndGameAnimationFinished(), animationDuration)
        }
        setSameValueCellSelected(false)
        setStyle({
            ...style,
            animationDelay: delay + 'ms',
        })
        setClassList(defaultClass.concat(' end-game-animation'))
    })

    useCellValueSetListener((payload: CellValueSetEventType) => {
        if (pointsAreEqual(payload.position, props.position)) {
            setRevealed(true)
        } else if (payload.value === props.cell.answer && revealed) {
            setSameValueCellSelected(true)
        }
    })

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
            style={style}
        >
            {board.renderCellComponent({
                selected: selected,
                cell: props.cell,
                position: props.position,
            })}
        </div>
    )
}
