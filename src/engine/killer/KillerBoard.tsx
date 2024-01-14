import { KillerCellComponent } from '../../components/sudoku/killer/KillerCellComponent'
import { Point, pointsAreEqual } from '../../math/Point'
import { Board, CellComponentProps } from '../Board'
import { KillerGridType } from './types/KillerGridType'

export class KillerBoard extends Board {
    public get grid(): KillerGridType {
        return this._grid as KillerGridType
    }

    constructor(grid: KillerGridType) {
        super({ grid })
    }

    public printCages() {
        console.log(this.grid.cages)
    }

    public renderCellComponent(props: CellComponentProps): JSX.Element {
        const cages = this.grid.cages
        return (
            <KillerCellComponent
                selected={props.selected}
                position={props.position}
                cell={props.cell}
                cage={cages.find((cage) => cage.cells.some((cell) => pointsAreEqual(cell, props.position)))!}
            />
        )
    }

    public cellsShareSameRegion(selectedPosition: Point, currentCellPosition: Point): boolean {
        if (super.cellsShareSameRegion(selectedPosition, currentCellPosition)) {
            return true
        }
        return (
            this.grid.cages.find((cage) => {
                return (
                    cage.cells.some((cell) => pointsAreEqual(cell, selectedPosition)) &&
                    cage.cells.some((cell) => pointsAreEqual(cell, currentCellPosition))
                )
            }) !== undefined
        )
    }
}
