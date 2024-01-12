import { KillerGridType } from './types/KillerGridType'
import { Board } from '../Board'

export class KillerBoard extends Board {
    public get grid(): KillerGridType {
        return this._grid as KillerGridType
    }

    constructor(grid: KillerGridType) {
        super(grid)
    }
}
