import { GridType } from '../engine/types/GridType'
import { CellWrapper } from './CellWrapper'

export class GridWrapper {
    private readonly _grid: GridType
    private readonly _cellsWrapper: CellWrapper[][]
    public constructor(grid: GridType) {
        this._grid = grid
        this._cellsWrapper = grid.cells.map((celLine, y) => celLine.map((cell, x) => new CellWrapper(cell, { x, y })))
    }

    public get grid() {
        return this._grid
    }

    public get cellsWrapper() {
        return this._cellsWrapper
    }
}
