import './BoardComponent.css'
import { Board } from '../engine/Board'
import { KillerGridComponent } from './killer/KillerGridComponent'
import { KillerGridType } from '../engine/killer/types/KillerGridType'

export function BoardComponent(props: { board: Board }) {
    return (
        <div className="board-component">
            <KillerGridComponent grid={props.board.grid as KillerGridType} />
        </div>
    )
}
