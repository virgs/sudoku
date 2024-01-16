import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type'
import { Point } from '../math/Point'
import { Board } from './Board'
import { GameLevel, GameMode } from './types/AvailableGames'
import { GridType } from './types/GridType'

import { getSudoku } from 'sudoku-gen'
import { MatrixOperations, MatrixOperationsType } from '../math/Matrix'

type FileContent = {
    puzzle: string //"-----81---8---467361-9--58---8--5---3--8764--15-4237985--------46-3---57-7-5-9361"
    solution: string //"237658149985214673614937582748195236329876415156423798593761824461382957872549361"
}

export class ClassicBoardCreator {
    private readonly matricesOperationsShuffle: MatrixOperationsType[]
    protected readonly dimension

    public constructor(dimension: Point = { x: 9, y: 9 }) {
        this.dimension = dimension
        const matrixOperations = new MatrixOperations(this.dimension)
        const validMatricesOperations: MatrixOperationsType[] = [
            (point) => matrixOperations.flipHorizontally(point),
            (point) => matrixOperations.flipVertically(point),
            (point) => matrixOperations.transposePoint(point),
            (point) => matrixOperations.rotateClockwise(point),
        ]
        this.matricesOperationsShuffle = validMatricesOperations
            .sort(() => Math.random() - 0.5)
            .filter(() => Math.random() > 0.5)
    }

    public async createBoard(level: GameLevel): Promise<Board> {
        const difficulty: Difficulty = this.mapLevelToDifficulty(level)
        const fileContent: FileContent = getSudoku(difficulty)

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

    protected createSquareRegions(numberOfNonets: Point, nonetsDimension: Point) {
        const regions: Point[][] = []
        Array.from(Array(numberOfNonets.y).keys()).forEach((regionY) =>
            Array.from(Array(numberOfNonets.x).keys()).forEach((regionX) => {
                const currentRegion: Point[] = []
                Array.from(Array(nonetsDimension.y).keys()).forEach((y) =>
                    Array.from(Array(nonetsDimension.x).keys()).forEach((x) => {
                        currentRegion.push({
                            y: regionY * numberOfNonets.y + y,
                            x: regionX * numberOfNonets.x + x,
                        })
                    })
                )
                regions.push(currentRegion)
            })
        )
        return regions
    }

    protected getPointOutOfIndex(index: number): Point {
        const original = {
            y: Math.floor(index % this.dimension.x),
            x: Math.floor(index / this.dimension.y),
        }
        return this.matricesOperationsShuffle.reduce((acc, operation) => operation(acc), original)
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

    protected createEmptyGrid(): GridType {
        return {
            dimension: this.dimension,
            cells: Array.from(Array(this.dimension.y).keys()).map(() =>
                Array.from(Array(this.dimension.x).keys()).map(() => ({
                    answer: 0,
                    revealed: false,
                }))
            ),
        }
    }
}
