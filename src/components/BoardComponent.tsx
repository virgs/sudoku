import './BoardComponent.css'
import { Board } from '../engine/Board'
import { KillerGridComponent } from './killer/KillerGridComponent'
import { KillerGridType } from '../engine/killer/types/KillerGridType'
import { CellType } from '../engine/types/CellType'

export function BoardComponent(props: { board: Board }) {
    const onCellClick = (cell: CellType) => {
        console.log(cell)
    }
    return (
        <div className="board-component">
            <KillerGridComponent onCellClick={onCellClick} grid={props.board.grid as KillerGridType} />
        </div>
    )
}
