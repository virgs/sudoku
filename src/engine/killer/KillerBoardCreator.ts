import { Point } from '../../math/Point'
import { BoardCreator } from '../BoardCreator'
import { GameLevel } from '../types/GameLevel'
import { KillerBoard } from './KillerBoard'
import { CageType } from './types/CageType'

type FileContent = {
    id: number
    mission: string, // 81 long string, revaled if != 0
    solution: string, // 81 long string, answers
    cages: number[][] //0 to 80
}

export class KillerBoardCreator extends BoardCreator {
    static readonly BOARD_DIMENSION: Point = { x: 9, y: 9 }
    static readonly pool = {
        [GameLevel.EASY]: import.meta.glob(`../../assets/puzzles/killer/easy/*.json`),
        [GameLevel.MEDIUM]: import.meta.glob(`../../assets/puzzles/killer/medium/*.json`),
        [GameLevel.HARD]: import.meta.glob(`../../assets/puzzles/killer/hard/*.json`),
        [GameLevel.EXPERT]: import.meta.glob(`../../assets/puzzles/killer/expert/*.json`),
    }

    public constructor() {
        super(KillerBoardCreator.BOARD_DIMENSION)
    }

    private getPointOutOfIndex(index: number): Point {
        return {
            y: Math.floor(index / KillerBoardCreator.BOARD_DIMENSION.y),
            x: Math.floor(index % KillerBoardCreator.BOARD_DIMENSION.x)
        }
    }

    private async randomlySelectFromPool(gameLevel: GameLevel): Promise<FileContent> {
        const pool = KillerBoardCreator.pool[gameLevel]
        const levelsModules = Object.keys(pool)
        const randomLevelIndex: number = Math.floor(Math.random() * levelsModules.length)
        return await pool[levelsModules[randomLevelIndex]]() as FileContent
    }

    public async createBoard(level: GameLevel): Promise<KillerBoard> {
        const fileContent: FileContent = await this.randomlySelectFromPool(level)
        const grid = this.createEmptyGrid()
        const revealedCells: boolean[] = fileContent.mission.split('').map(value => value !== '0')
        const answers: number[] = fileContent.solution.split('').map(value => Number(value))
        for (let i = 0; i < KillerBoardCreator.BOARD_DIMENSION.y * KillerBoardCreator.BOARD_DIMENSION.x; ++i) {
            const position = this.getPointOutOfIndex(i)
            grid.cells[position.y][position.x].answer = answers[i]
            grid.cells[position.y][position.x].revealed = revealedCells[i]
        }
        const cages: CageType[] = fileContent.cages
            .map(fileCage => ({
                label: fileCage.reduce((acc, cageCell) => acc + answers[cageCell], 0),
                cells: fileCage.map(cageCell => this.getPointOutOfIndex(cageCell))
            }))

        return new KillerBoard(
            {
                dimension: grid.dimension,
                cells: grid.cells,
                cages: cages,
            },
            level
        )
    }
}
