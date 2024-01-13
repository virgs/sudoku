import { CellComponent } from '../components/CellComponent'
import { Board } from '../engine/Board'
import { pointsAreEqual } from '../math/Point'
import { CellWrapper } from './CellWrapper'
import { GridWrapper } from './GridWrapper'

export type CellComponentProps = {
    cellWrapper: CellWrapper
    onCellClick: (cell: CellWrapper) => void
}

export class BoardWrapper {
    protected readonly _board: Board
    protected readonly _gridWrapper: GridWrapper

    public constructor(board: Board) {
        this._board = board
        this._gridWrapper = new GridWrapper(board.grid)
    }

    public get gridWrapper() {
        return this._gridWrapper
    }

    public get board() {
        return this._board
    }

    public renderCellComponent(props: CellComponentProps): JSX.Element {
        return <CellComponent onCellClick={props.onCellClick} cellWrapper={props.cellWrapper}></CellComponent>
    }

    public selectCell(selectedCell: CellWrapper) {
        const cellsWrapper = this.gridWrapper.cellsWrapper
        cellsWrapper.forEach(cellsWrapperLine => cellsWrapperLine
            .forEach(cellWrapper => {
                if (pointsAreEqual(cellWrapper.position, selectedCell.position)) {
                    cellWrapper.select()
                } else if (cellWrapper.position.x === selectedCell.position.x ||
                    cellWrapper.position.y === selectedCell.position.y) {
                    cellWrapper.highlight()
                } else {
                    cellWrapper.unselect()
                    cellWrapper.unhighlight()
                }
            }))
    }
}
