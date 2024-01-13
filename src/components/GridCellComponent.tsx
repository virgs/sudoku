import { useEffect, useState } from "react"
import { CellType } from "../engine/types/CellType"
import { Point } from "../math/Point"
import { CellComponentProps } from "../wrapper/BoardWrapper"
import "./GridCellComponent.css"

type GridCellComponentProps = {
    position: Point
    currentCell: CellType
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
        console.log(list)
        setClassList(list)
    }, [selected])


    const cellComponent = props.renderCellComponent({
        cell: props.currentCell,
        position: props.position,
        onCellClick: (cell: CellType) => {
            setSelected(true)
        }
    })
    return (
        <div className={classList.join(' ')}>
            {cellComponent}
        </div>
    )

}