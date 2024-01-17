import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type'
import { Point } from '../math/Point'
import { Board } from './Board'
import { GameLevel, GameMode } from './types/AvailableGames'

import { getSudoku } from 'sudoku-gen'
import { MatrixOperations, MatrixOperationsType } from '../math/Matrix'
import { BoardCreator } from './BoardCreator'

type LibResultType = {
    puzzle: string //"-----81---8---467361-9--58---8--5---3--8764--15-4237985--------46-3---57-7-5-9361"
    solution: string //"237658149985214673614937582748195236329876415156423798593761824461382957872549361"
}

export class ClassicBoardCreator extends BoardCreator {
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

    public async createBoard(level: GameLevel): Promise<Board> {
        const difficulty: Difficulty = this.mapLevelToDifficulty(level)
        const fileContent: LibResultType = getSudoku(difficulty)

        const revealedCells: boolean[] = fileContent.puzzle.split('').map((value) => value !== '-')
        const answers: number[] = fileContent.solution.split('').map((value) => Number(value))

        const grid = this.createEmptyGrid()

        for (let i = 0; i < grid.dimension.y * grid.dimension.x; ++i) {
            const position = this.getPointOutOfIndex(i)
            grid.cells[position.y][position.x].answer = answers[i]
            grid.cells[position.y][position.x].revealed = revealedCells[i]
        }

        return new Board({
            grid: grid,
            gameLevel: level,
            gameMode: GameMode.CLASSIC,
            regions: this.createSquareRegions({ y: 3, x: 3 }, { y: 3, x: 3 }),
        })
    }

    protected createSquareRegions(numberOfRegions: Point, regionDimension: Point) {
        const regions: Point[][] = []
        Array.from(Array(numberOfRegions.y).keys()).forEach((regionY) =>
            Array.from(Array(numberOfRegions.x).keys()).forEach((regionX) => {
                const currentRegion: Point[] = []
                Array.from(Array(regionDimension.y).keys()).forEach((y) =>
                    Array.from(Array(regionDimension.x).keys()).forEach((x) => {
                        currentRegion.push({
                            y: regionY * regionDimension.y + y,
                            x: regionX * regionDimension.x + x,
                        })
                    })
                )
                regions.push(currentRegion)
            })
        )
        return regions
    }

    private mapLevelToDifficulty(level: GameLevel): Difficulty {
        switch (level) {
            case GameLevel.MEDIUM:
                return 'medium'
            case GameLevel.HARD:
                return 'hard'
            case GameLevel.EXPERT:
                return 'expert'
        }
        return 'easy'
    }
}
