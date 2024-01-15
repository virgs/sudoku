import { CellContentComponent } from '../components/board/CellContentComponent'
import { Point, pointsAreEqual } from '../math/Point'
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
    regions: Point[][]
}

export class Board {
    private readonly _gameMode: GameMode
    private readonly _gameLevel: GameLevel
    protected readonly _grid: GridType
    private readonly _regions: Point[][]

    constructor(props: BoardProps) {
        this._grid = props.grid
        this._gameMode = props.gameMode
        this._gameLevel = props.gameLevel
        this._regions = props.regions
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

    public get regions(): Point[][] {
        return this._regions
    }

    public printAnswers() {
        const answerLines = this.grid.cells.map((line) => `|${line.map((cell) => ` ${cell.answer} `).join('|')}|\n`)
        console.log(answerLines.join('-'.repeat(answerLines[0].length) + '\n'))
    }

    public isNumberAllowed(value: number): boolean {
        return value >= 1 && value <= 9
    }

    public renderCellComponent(props: CellComponentProps): JSX.Element {
        return (
            <CellContentComponent
                position={props.position}
                selected={props.selected}
                cell={props.cell}
            ></CellContentComponent>
        )
    }

    public isPositionInbound(position: Point): boolean {
        return this._grid.cells[position.y][position.x] !== undefined
    }

    public getCellRegions(cellPosition: any): Point[][] {
        return this.regions.filter((region) => region.some((point) => pointsAreEqual(cellPosition, point)))
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
        const selectedPositionRegions: Point[][] = this.getCellRegions(selectedPosition)
        if (
            selectedPositionRegions.some((region: Point[]) =>
                region.some((cell: Point) => pointsAreEqual(cell, currentCellPosition))
            )
        ) {
            return true
        }
        return false
    }
}
