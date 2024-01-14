import { CellComponent } from '../components/sudoku/CellComponent'
import { Point } from '../math/Point'
import { CellType } from './types/CellType'
import { GridType } from './types/GridType'

export type CellComponentProps = {
    cell: CellType
    selected: boolean
    position: Point
}

export class Board {
    protected readonly _grid: GridType
    private readonly _blocksDimension: Point = { x: 3, y: 3 }
    private readonly _numOfBlocks: Point = { x: 3, y: 3 }

    constructor({ grid }: { grid: GridType }) {
        this._grid = grid
    }

    public get grid(): GridType {
        return this._grid
    }

    public get blocksDimension(): Point {
        return this._blocksDimension
    }
    public get numOfBlocks(): Point {
        return this._numOfBlocks
    }

    public printAnswers() {
        const answerLines = this.grid.cells.map((line) => `|${line.map((cell) => ` ${cell.answer} `).join('|')}|\n`)
        console.log(answerLines.join('-'.repeat(answerLines[0].length) + '\n'))
    }

    public isNumberAllowed(value: number): boolean {
        return value >= 1 && value <= 9
    }

    public renderCellComponent(props: CellComponentProps): JSX.Element {
        return <CellComponent position={props.position} selected={props.selected} cell={props.cell}></CellComponent>
    }

    public cellsShareSameRegion(selectedPosition: Point, currentCellPosition: Point): boolean {
        if (selectedPosition.x === currentCellPosition.x) {
            //same column
            return true
        }
        if (selectedPosition.y === currentCellPosition.y) {
            //same line
            return true
        }
        if (
            Math.floor(selectedPosition.x / this.numOfBlocks.x) ===
            Math.floor(currentCellPosition.x / this.numOfBlocks.x) && //same nonet
            Math.floor(selectedPosition.y / this.numOfBlocks.y) ===
            Math.floor(currentCellPosition.y / this.numOfBlocks.y)
        ) {
            return true
        }
        return false
    }
}
