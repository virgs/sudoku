import { MatrixOperations, MatrixOperationsType } from '../../math/Matrix'
import { BoardCreator } from '../BoardCreator'
import { GameLevel } from '../types/AvailableGames'
import { KillerBoard } from './KillerBoard'
import { CageType } from './types/CageType'

type FileContent = {
    id: number
    mission: string // 81 long string, revaled if != 0
    solution: string // 81 long string, answers
    cages: number[][] //0 to 80
}

const numOfOnlineFiles = 300

export class KillerBoardCreator extends BoardCreator {
    static readonly pool = {
        [GameLevel.EASY]: import.meta.glob(`../../assets/puzzles/killer/easy/*.json`),
        [GameLevel.MEDIUM]: import.meta.glob(`../../assets/puzzles/killer/medium/*.json`),
        [GameLevel.HARD]: import.meta.glob(`../../assets/puzzles/killer/hard/*.json`),
        [GameLevel.EXPERT]: import.meta.glob(`../../assets/puzzles/killer/expert/*.json`),
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

    public async createBoard(level: GameLevel): Promise<KillerBoard> {
        const fileContent: FileContent = await this.randomlySelectLevel(level)
        const grid = this.createEmptyGrid()
        const revealedCells: boolean[] = fileContent.mission.split('').map((value) => value !== '0')
        const answers: number[] = fileContent.solution.split('').map((value) => Number(value))
        for (let i = 0; i < grid.dimension.y * grid.dimension.x; ++i) {
            const position = this.getPointOutOfIndex(i)
            grid.cells[position.y][position.x].answer = answers[i]
            grid.cells[position.y][position.x].revealed = revealedCells[i]
        }
        const cages: CageType[] = fileContent.cages.map((fileCage) => ({
            label: fileCage.reduce((acc, cageCell) => acc + answers[cageCell], 0),
            cells: fileCage.map((cageCell) => this.getPointOutOfIndex(cageCell)),
        }))

        return new KillerBoard(
            {
                dimension: grid.dimension,
                cells: grid.cells,
                cages: cages,
            },
            level,
            this.createSquareRegions({ y: 3, x: 3 }, { y: 3, x: 3 })
        )
    }

    private async randomlySelectFromOnlineRepo(gameLevel: GameLevel): Promise<FileContent> {
        const randomLevelIndex: number = Math.floor(Math.random() * numOfOnlineFiles)
        const response = await fetch(
            `https://raw.githubusercontent.com/virgs/sudoku/main/data/killer/${gameLevel.toLowerCase()}/${randomLevelIndex}.json`
        )
        return await response.json()
    }

    private async randomlySelectFromFilePool(gameLevel: GameLevel): Promise<FileContent> {
        const pool = KillerBoardCreator.pool[gameLevel]
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
