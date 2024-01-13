import { CageType } from '../../engine/killer/types/CageType'
import { pointsAreEqual } from '../../math/Point'
import { CellWrapper } from '../../wrapper/CellWrapper'
import { CellComponent } from '../CellComponent'
import './KillerGridCageComponent.css'

type KillerGridCageProps = {
    cellWrapper: CellWrapper
    cage: CageType
    onCellClick: (cell: CellWrapper) => void
}

export function KillerGridCageComponent(props: KillerGridCageProps) {
    const cageLabelCellPosition = props.cage.cells.reduce((acc, cell) => {
        if (cell.x <= acc.x) {
            if (cell.y <= acc.y) {
                return cell
            }
        }
        return acc
    }, props.cage.cells[0])
    const cellPosition = props.cellWrapper.position
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
    const style = checkBorderStyle()
    return (
        <div className="grid-cage" style={style}>
            {hasLabel ? <small className="grid-cage-label">{props.cage.label}</small> : <></>}
            <CellComponent onCellClick={props.onCellClick} cellWrapper={props.cellWrapper}></CellComponent>
        </div>
    )
}
