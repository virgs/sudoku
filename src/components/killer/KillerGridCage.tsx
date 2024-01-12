import "./KillerGridCage.css"
import { CageType } from '../../engine/killer/types/CageType';
import { CellType } from '../../engine/types/CellType';
import { CellComponent } from '../CellComponent';
import { Point, pointsAreEqual } from "../../math/Point";


type KillerGridCageProps = {
    cell: CellType;
    cage: CageType;
    position: Point;
    onCellClick: (cell: CellType) => void
};

export function KillerGridCage(props: KillerGridCageProps) {
    const cageLabelCellPosition = props.cage.cells
        .reduce((acc, cell) => {
            if (cell.x <= acc.x) {
                if (cell.y <= acc.y) {
                    return cell
                }
            }
            return acc
        }, props.cage.cells[0])
    const checkBorderStyle = () => {
        const style: React.CSSProperties = {
        }
        if (props.cage.cells
            .some(cell => pointsAreEqual(cell, { x: props.position.x, y: props.position.y + 1 }))) {
            style.borderBottom = 'none'
        }
        if (props.cage.cells
            .some(cell => pointsAreEqual(cell, { x: props.position.x, y: props.position.y - 1 }))) {
            style.borderTop = 'none'
        }
        if (props.cage.cells
            .some(cell => pointsAreEqual(cell, { x: props.position.x + 1, y: props.position.y }))) {
            style.borderRight = 'none'
        }
        if (props.cage.cells
            .some(cell => pointsAreEqual(cell, { x: props.position.x - 1, y: props.position.y }))) {
            style.borderLeft = 'none'
        }
        return style
    }

    const hasLabel = pointsAreEqual(cageLabelCellPosition, props.position)
    const style = checkBorderStyle()
    return <div className='grid-cage' style={style}>
        {hasLabel ? <small className="grid-cage-label">{props.cage.label}</small>
            : <></>}
        <CellComponent onCellClick={props.onCellClick} cell={props.cell}></CellComponent>
    </div>;

}
