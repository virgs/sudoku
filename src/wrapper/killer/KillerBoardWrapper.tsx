import { CellComponent } from "../../components/CellComponent"
import { KillerGridCageComponent } from "../../components/killer/KillerGridCageComponent"
import { Board } from "../../engine/Board"
import { KillerBoard } from "../../engine/killer/KillerBoard"
import { CageType } from "../../engine/killer/types/CageType"
import { KillerGridType } from "../../engine/killer/types/KillerGridType"
import { pointsAreEqual } from "../../math/Point"
import { BoardWrapper } from "../BoardWrapper"
import { CellWrapper } from "../CellWrapper"

export type CellComponentProps = {
    cellWrapper: CellWrapper
    onCellClick: (cell: CellWrapper) => void
}

export class KillerBoardWrapper extends BoardWrapper {
    public constructor(board: KillerBoard) {
        super(board)
    }

    public renderCellComponent(props: CellComponentProps): JSX.Element {
        const cages = (this.gridWrapper.grid as KillerGridType).cages
        return <KillerGridCageComponent
            onCellClick={props.onCellClick}
            cellWrapper={props.cellWrapper}
            cage={
                cages.find((cage) => cage.cells.some((cell) => pointsAreEqual(cell, props.cellWrapper.position)))!
            }
        ></KillerGridCageComponent>
    }
}
