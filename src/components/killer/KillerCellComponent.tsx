import { CageType } from '../../engine/killer/types/CageType'
import { CellType } from '../../engine/types/CellType'
import { Point, pointsAreEqual } from '../../math/Point'
import { CellComponent } from '../CellComponent'
import './KillerCellComponent.css'

type KillerCellProps = {
    cell: CellType
    position: Point
    cage: CageType
}

export function KillerCellComponent(props: KillerCellProps) {
    const cageLabelCellPosition = props.cage.cells.reduce((acc, cell) => {
        if (cell.x <= acc.x) {
            if (cell.y <= acc.y) {
                return cell
            }
        }
        return acc
    }, props.cage.cells[0])
    const cellPosition = props.position
    const checkBorderStyle = () => {
        const style: React.CSSProperties = {}
        if (props.cage.cells.some((cell) => pointsAreEqual(cell, { x: cellPosition.x, y: cellPosition.y + 1 }))) {
            style.borderBottom = 'none'
        }
        if (props.cage.cells.some((cell) => pointsAreEqual(cell, { x: cellPosition.x, y: cellPosition.y - 1 }))) {
            style.borderTop = 'none'
        }
        if (props.cage.cells.some((cell) => pointsAreEqual(cell, { x: cellPosition.x + 1, y: cellPosition.y }))) {
            style.borderRight = 'none'
        }
        if (props.cage.cells.some((cell) => pointsAreEqual(cell, { x: cellPosition.x - 1, y: cellPosition.y }))) {
            style.borderLeft = 'none'
        }
        return style
    }

    const hasLabel = pointsAreEqual(cageLabelCellPosition, cellPosition)
    let className = 'grid-cage'
    if (hasLabel) {
        className += ' labeled'
    }
    const style = checkBorderStyle()
    return (
        <>
            {hasLabel ? <small className="grid-cage-label">{props.cage.label}</small> : <></>}
            <div className={className} style={style}>
                <CellComponent cell={props.cell}></CellComponent>
            </div>
        </>
    )
}
