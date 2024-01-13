import { BoardWrapper } from '../wrapper/BoardWrapper'
import { CellWrapper } from '../wrapper/CellWrapper'
import './BoardComponent.css'
import { KillerGridComponent } from './killer/KillerGridComponent'

export function BoardComponent(props: { boardWrapper: BoardWrapper }) {
    const onCellClick = (cell: CellWrapper) => {
        props.boardWrapper.selectCell(cell)
    }
    return (
        <div className="board-component">
            <KillerGridComponent onCellClick={onCellClick} gridWrapper={props.boardWrapper.gridWrapper} />
        </div>
    )
}
