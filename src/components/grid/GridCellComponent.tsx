import { useEffect, useState } from "react"
import { CellType } from "../../engine/types/CellType"
import { Point, pointsAreEqual } from "../../math/Point"
import { CellComponentProps } from "../../wrapper/BoardWrapper"
import "./GridCellComponent.css"
import { EventEmitter } from "../../eventEmitter/EventEmitter"
import { Events } from "../../eventEmitter/Events"

type GridCellComponentProps = {
    position: Point
    cell: CellType
    renderCellComponent: (cellComponentProps: CellComponentProps) => JSX.Element;
}

export function GridCellComponent(props: GridCellComponentProps) {
    const [selected, setSelected] = useState<boolean>(false)
    const [highlighted, setHighlighted] = useState<boolean>(false)
    const [classList, setClassList] = useState<string[]>(['grid-cell'])

    useEffect(() => {
        const list = ['grid-cell']
        if (selected) {
            list.push('selected')
        }
        if (highlighted) {
            list.push('highlighted')
        }
        setClassList(list)
    }, [selected, highlighted])

    const onCellClick = () => EventEmitter.emit(Events.CELL_SELECTED, { cell: props.cell, position: props.position })

    const cellComponent = props.renderCellComponent({
        cell: props.cell,
        position: props.position
    })
    EventEmitter.on(Events.CELL_SELECTED, (data: { cell: CellType, position: Point }) => {
        setSelected(false)
        setHighlighted(false)
        if (pointsAreEqual(props.position, data.position)) {
            setSelected(true)
        } else if (props.position.x === data.position.x ||
            props.position.y === data.position.y) {
            setHighlighted(true)
        }
    })
    return (
        <div onPointerDown={() => onCellClick()} className={classList.join(' ')}>
            {cellComponent}
        </div>
    )

}