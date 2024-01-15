import { CellContentComponent } from '../components/board/CellContentComponent'
import { Point } from '../math/Point'
import { CellType } from './types/CellType'
import { GameLevel } from './types/GameLevel'
import { GameMode } from './types/GameMode'
import { GridType } from './types/GridType'

export type CellComponentProps = {
    cell: CellType
    selected: boolean
    position: Point
}

type BoardProps = {
    grid: GridType
    gameMode: GameMode
    gameLevel: GameLevel
    blocksDimension: Point
    numOfBlocks: Point
}

export class Board {
    private readonly _gameMode: GameMode
    private readonly _gameLevel: GameLevel
    protected readonly _grid: GridType
    private readonly _blocksDimension: Point
    private readonly _numOfBlocks: Point

    constructor(props: BoardProps) {
        this._grid = props.grid
        this._gameMode = props.gameMode
        this._gameLevel = props.gameLevel
        this._blocksDimension = props.blocksDimension
        this._numOfBlocks = props.numOfBlocks
    }

    public get grid(): GridType {
        return this._grid
    }

    public get gameMode(): GameMode {
        return this._gameMode
    }

    public get gameLevel(): GameLevel {
        return this._gameLevel
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
        return <CellContentComponent position={props.position} selected={props.selected} cell={props.cell}></CellContentComponent>
    }

    public isPositionInbound(position: Point): boolean {
        return (
            position.x >= 0 &&
            position.x < this.numOfBlocks.x * this.blocksDimension.x &&
            position.y >= 0 &&
            position.y < this.numOfBlocks.y * this.blocksDimension.y
        )
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
