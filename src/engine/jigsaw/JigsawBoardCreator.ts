import { MatrixOperations, MatrixOperationsType } from '../../math/Matrix'
import { Point } from '../../math/Point'
import { BoardCreator } from '../BoardCreator'
import { GameLevel } from '../types/AvailableGames'
import { JigsawBoard } from './JigsawBoard'

type FileContent = {
    puzzleData: {
        type: number
        gridWidth: number
        gridHeight: number
        source: any
        startingGrid: number[] // different than 0 if revealed
        answers: number[]
        layout: number[] //same number belong to the same regions
    }
    title: string
    nextPuzzleURL: string
}

const numOfOnlineFiles = 100

export class JigsawBoardCreator extends BoardCreator {
    static readonly pool = {
        [GameLevel.EASY]: import.meta.glob(`../../assets/puzzles/jigsaw/easy/*.json`),
        [GameLevel.MEDIUM]: import.meta.glob(`../../assets/puzzles/jigsaw/medium/*.json`),
        [GameLevel.HARD]: import.meta.glob(`../../assets/puzzles/jigsaw/hard/*.json`),
        [GameLevel.EXPERT]: import.meta.glob(`../../assets/puzzles/jigsaw/expert/*.json`),
    }

    public constructor() {
        const dimension = { x: 9, y: 9 }
        const matrixOperations = new MatrixOperations(dimension)
        const validMatricesOperations: MatrixOperationsType[] = [
            (point) => matrixOperations.transposePoint(point),
            (point) => matrixOperations.rotateClockwise(point),
            (point) => matrixOperations.flipHorizontally(point),
            (point) => matrixOperations.flipVertically(point),
        ]

        super(validMatricesOperations, dimension)
    }

    public async createBoard(level: GameLevel): Promise<JigsawBoard> {
        const fileContent: FileContent = await this.randomlySelectLevel(level)
        const grid = this.createEmptyGrid()
        const numberSwapMap = BoardCreator.createNumbersSwapMap(9)
        for (let i = 0; i < grid.dimension.y * grid.dimension.x; ++i) {
            const position = this.getPointOutOfIndex(i)
            const answer = fileContent.puzzleData.answers[i]
            const revealed = fileContent.puzzleData.startingGrid[i] !== 0
            const swappedValue = numberSwapMap.get(answer)
            grid.cells[position.y][position.x].answer = swappedValue!
            grid.cells[position.y][position.x].revealed = revealed
        }
        const layout = fileContent.puzzleData.layout
            .reduce((acc: Map<number, Point[]>, value: number, index: number) => {
                const position = this.getPointOutOfIndex(index)
                acc.get(value)?.push(position) ?? acc.set(value, [position])
                return acc
            }, new Map<number, Point[]>())
            .values()

        return new JigsawBoard(
            {
                dimension: grid.dimension,
                cells: grid.cells,
            },
            level,
            Array.from(layout)
        )
    }

    private async randomlySelectFromOnlineRepo(gameLevel: GameLevel): Promise<FileContent> {
        const randomLevelIndex: number = Math.floor(Math.random() * numOfOnlineFiles)
        const response = await fetch(
            `https://raw.githubusercontent.com/virgs/sudoku/main/data/jigsaw/${gameLevel.toLowerCase()}/${randomLevelIndex}.json`
        )
        return await response.json()
    }

    private async randomlySelectFromFilePool(gameLevel: GameLevel): Promise<FileContent> {
        const pool = JigsawBoardCreator.pool[gameLevel]
        const levelsModules = Object.keys(pool)
        const randomLevelIndex: number = Math.floor(Math.random() * levelsModules.length)
        return (await pool[levelsModules[randomLevelIndex]]()) as FileContent
    }

    private async randomlySelectLevel(gameLevel: GameLevel): Promise<FileContent> {
        try {
            return await this.randomlySelectFromOnlineRepo(gameLevel)
        } catch (err) {
            console.log('Unable to retrieve online board. Fallback to file pool')
            return await this.randomlySelectFromFilePool(gameLevel)
        }
    }
}
