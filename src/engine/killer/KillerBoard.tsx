import { KillerGridType } from './types/KillerGridType'
import { Board, CellComponentProps } from '../Board'
import { KillerCellComponent } from '../../components/killer/KillerCellComponent'
import { Point, pointsAreEqual } from '../../math/Point'

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
                position={props.position}
                cell={props.cell}
                cage={cages.find((cage) => cage.cells.some((cell) => pointsAreEqual(cell, props.position)))!}
            />
        )
    }

    public shouldHighlightCell(selectedPosition: Point, currentCellPosition: Point): boolean {
        if (super.shouldHighlightCell(selectedPosition, currentCellPosition)) {
            return true
        }
        return this.grid.cages
            .find(cage => {
                return cage.cells.some((cell) => pointsAreEqual(cell, selectedPosition)) &&
                    cage.cells.some((cell) => pointsAreEqual(cell, currentCellPosition))
            }) !== undefined
    }

}
