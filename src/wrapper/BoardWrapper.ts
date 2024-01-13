import { Board } from '../engine/Board'
import { CellWrapper } from './CellWrapper'
import { GridWrapper } from './GridWrapper'

export class BoardWrapper {
    private readonly _board: Board
    private readonly _gridWrapper: GridWrapper

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

    selectCell(cell: CellWrapper) {
        throw new Error('Method not implemented.')
    }
}
