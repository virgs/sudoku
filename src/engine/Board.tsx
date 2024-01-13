import { CellComponent } from '../components/CellComponent'
import { Point } from '../math/Point'
import { CellType } from './types/CellType'
import { GridType } from './types/GridType'

export type CellComponentProps = {
    cell: CellType
    position: Point
}

export class Board {
    protected readonly _grid: GridType

    constructor({ grid }: { grid: GridType }) {
        this._grid = grid
    }

    public get grid(): GridType {
        return this._grid
    }

    public printAnswers() {
        const answerLines = this.grid.cells.map((line) => `|${line.map((cell) => ` ${cell.answer} `).join('|')}|\n`)
        console.log(answerLines.join('-'.repeat(answerLines[0].length) + '\n'))
    }

    public renderCellComponent(props: CellComponentProps): JSX.Element {
        return <CellComponent cell={props.cell}></CellComponent>
    }

    public shouldHighlightCell(selectedPosition: Point, currentCellPosition: Point): boolean {
        if (selectedPosition.x === currentCellPosition.x) { //same column
            return true
        }
        if (selectedPosition.y === currentCellPosition.y) { //same line
            return true
        }
        if (Math.floor(selectedPosition.x / 3) === Math.floor(currentCellPosition.x / 3) &&  //same nonet
            Math.floor(selectedPosition.y / 3) === Math.floor(currentCellPosition.y / 3)) {
            return true
        }
        return false
    }

}
