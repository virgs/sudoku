import { KillerCellComponent } from "../../components/killer/KillerCellComponent"
import { KillerBoard } from "../../engine/killer/KillerBoard"
import { KillerGridType } from "../../engine/killer/types/KillerGridType"
import { pointsAreEqual } from "../../math/Point"
import { BoardWrapper, CellComponentProps } from "../BoardWrapper"


export class KillerBoardWrapper extends BoardWrapper {
    public constructor(board: KillerBoard) {
        super(board)
    }

    public renderCellComponent(props: CellComponentProps): JSX.Element {
        const cages = (this.gridWrapper.grid as KillerGridType).cages
        return <KillerCellComponent
            position={props.position}
            onCellClick={props.onCellClick}
            cell={props.cell}
            cage={
                cages.find((cage) => cage.cells.some((cell) => pointsAreEqual(cell, props.position)))!
            }
        ></KillerCellComponent>
    }
}
