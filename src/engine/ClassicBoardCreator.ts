import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type'
import { Point } from '../math/Point'
import { Board } from './Board'
import { GameLevel } from './types/GameLevel'
import { GameMode } from './types/GameMode'
import { GridType } from './types/GridType'

import { getSudoku } from 'sudoku-gen';

type FileContent = {
    puzzle: string;  //"-----81---8---467361-9--58---8--5---3--8764--15-4237985--------46-3---57-7-5-9361"
    solution: string //"237658149985214673614937582748195236329876415156423798593761824461382957872549361"
}


export class ClassicBoardCreator {
    static readonly BOARD_DIMENSION: Point = { x: 9, y: 9 }

    public async createBoard(level: GameLevel): Promise<Board> {
        const difficulty: Difficulty = this.mapLevelToDifficulty(level)
        const fileContent: FileContent = getSudoku(difficulty)

        const revealedCells: boolean[] = fileContent.puzzle.split('').map(value => value !== '-')
        const answers: number[] = fileContent.solution.split('').map(value => Number(value))

        const grid = this.createEmptyGrid();

        for (let i = 0; i < ClassicBoardCreator.BOARD_DIMENSION.y * ClassicBoardCreator.BOARD_DIMENSION.x; ++i) {
            const position = this.getPointOutOfIndex(i)
            grid.cells[position.y][position.x].answer = answers[i]
            grid.cells[position.y][position.x].revealed = revealedCells[i]
        }

        return new Board({ grid: grid, gameLevel: level, gameMode: GameMode.CLASSIC })
    }

    protected getPointOutOfIndex(index: number): Point {
        return {
            y: Math.floor(index / ClassicBoardCreator.BOARD_DIMENSION.y),
            x: Math.floor(index % ClassicBoardCreator.BOARD_DIMENSION.x)
        }
    }


    private mapLevelToDifficulty(level: GameLevel): Difficulty {
        switch (level) {
            case GameLevel.MEDIUM: return 'medium'
            case GameLevel.HARD: return 'hard'
            case GameLevel.EXPERT: return 'expert'
        }
        return 'easy'
    }

    protected createEmptyGrid(): GridType {
        return {
            dimension: ClassicBoardCreator.BOARD_DIMENSION,
            cells: Array.from(Array(ClassicBoardCreator.BOARD_DIMENSION.y).keys()).map(() =>
                Array.from(Array(ClassicBoardCreator.BOARD_DIMENSION.x).keys()).map(() => ({
                    answer: 0,
                    revealed: false,
                }))
            ),
        }
    }
}
