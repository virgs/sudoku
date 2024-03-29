import { MatrixOperations, MatrixOperationsType } from '../../math/Matrix'
import { BoardCreator } from '../BoardCreator'
import { GameLevel } from '../types/AvailableGames'
import { MiniBoard } from './MiniBoard'

type FileContent = {
    success: boolean
    puzzle: {
        id: string
        difficulty: string
        data: number[] //   answersId...   4,5,103,2,101, preceededWith '10' if revealed
    }
}

const numOfOnlineFiles = 50

export class MiniBoardCreator extends BoardCreator {
    static readonly pool = {
        [GameLevel.EASY]: import.meta.glob(`../../assets/puzzles/mini/*.json`),
    }

    public constructor() {
        const dimension = { x: 6, y: 6 }
        const matrixOperations = new MatrixOperations(dimension)
        const validMatricesOperations: MatrixOperationsType[] = [
            (point) => matrixOperations.flipHorizontally(point),
            (point) => matrixOperations.flipVertically(point),
        ]

        super(validMatricesOperations, dimension)
    }

    public async createBoard(_level: GameLevel): Promise<MiniBoard> {
        const fileContent: FileContent = await this.randomlySelectLevel()
        const grid = this.createEmptyGrid()
        const revealedCells: boolean[] = fileContent.puzzle.data.map((value) => value > 100)
        const answers: number[] = fileContent.puzzle.data.map((value) => value % 100)
        const numberSwapMap = BoardCreator.createNumbersSwapMap(6)

        for (let i = 0; i < this.dimension.y * this.dimension.x; ++i) {
            const position = this.getPointOutOfIndex(i)
            const swappedValue = numberSwapMap.get(answers[i])
            grid.cells[position.y][position.x].answer = swappedValue!
            grid.cells[position.y][position.x].revealed = revealedCells[i]
        }
        return new MiniBoard(grid, GameLevel.EASY, this.createSquareRegions({ y: 2, x: 3 }, { y: 3, x: 2 }))
    }

    private async randomlySelectFromOnlineRepo(): Promise<FileContent> {
        const randomLevelIndex: number = Math.floor(Math.random() * numOfOnlineFiles)
        const response = await fetch(
            `https://raw.githubusercontent.com/virgs/sudoku/main/data/mini/${randomLevelIndex}.json`
        )
        return await response.json()
    }

    private async randomlySelectFromFilePool(): Promise<FileContent> {
        const pool = MiniBoardCreator.pool[GameLevel.EASY]
        const levelsModules = Object.keys(pool)
        const randomLevelIndex: number = Math.floor(Math.random() * levelsModules.length)
        return (await pool[levelsModules[randomLevelIndex]]()) as FileContent
    }

    private async randomlySelectLevel(): Promise<FileContent> {
        try {
            return await this.randomlySelectFromOnlineRepo()
        } catch (err) {
            console.log('Unable to retrieve online board. Fallback to file pool')
            return await this.randomlySelectFromFilePool()
        }
    }
}
