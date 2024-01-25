import { GameLevel } from "../types/AvailableGames"

export class JigsawBoardCreator {
    private board: number[][]
    private size: number
    private boxSize: number
    private difficulty: number
    private template: number[][]

    constructor(size: number, level: GameLevel, template: number[][]) {
        this.size = size
        this.boxSize = Math.sqrt(size)
        this.difficulty = this.mapLevelToDifficulty(level)
        this.template = template
        this.board = this.generateEmptyBoard()
        this.generateJigsawSudoku()
        this.removeCells()
    }

    public getBoard(): number[][] {
        return this.board
    }

    private mapLevelToDifficulty(level: GameLevel): number {
        switch (level) {
            case GameLevel.MEDIUM:
                return .3
            case GameLevel.HARD:
                return .7
            case GameLevel.EXPERT:
                return 1
        }
        return .15
    }
    private generateEmptyBoard(): number[][] {
        return Array.from({ length: this.size }, () => Array(this.size).fill(0))
    }

    private shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    private isValidMoveInRegion(row: number, col: number, num: number): boolean {
        const region = this.template[row][col]

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.template[i][j] === region && this.board[i][j] === num) {
                    return false
                }
            }
        }

        return true
    }

    private isValidMove(row: number, col: number, num: number): boolean {
        if (!this.isValidMoveInRegion(row, col, num)) {
            return false
        }

        for (let i = 0; i < this.size; i++) {
            if (this.board[row][i] === num || this.board[i][col] === num) {
                return false
            }
        }

        const startRow = Math.floor(row / this.boxSize) * this.boxSize
        const startCol = Math.floor(col / this.boxSize) * this.boxSize

        for (let i = 0; i < this.boxSize; i++) {
            for (let j = 0; j < this.boxSize; j++) {
                if (this.board[startRow + i][startCol + j] === num) {
                    return false
                }
            }
        }

        return true
    }

    private solve(): boolean {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.board[row][col] === 0) {
                    for (let num = 1; num <= this.size; num++) {
                        if (this.isValidMove(row, col, num)) {
                            this.board[row][col] = num

                            if (this.solve()) {
                                return true
                            }

                            this.board[row][col] = 0
                        }
                    }

                    return false
                }
            }
        }

        return true
    }

    private removeCells(): void {
        let cellsToRemove = Math.floor((this.size * this.size * this.difficulty) / 100)

        while (cellsToRemove > 0) {
            const row = Math.floor(Math.random() * this.size)
            const col = Math.floor(Math.random() * this.size)

            if (this.board[row][col] !== 0) {
                this.board[row][col] = 0
                cellsToRemove--
            }
        }
    }

    private generateJigsawSudoku(): void {
        const base = Array.from({ length: this.size }, (_, index) => index + 1)
        const shuffledBase = this.shuffleArray(base)

        for (let i = 0; i < this.size; i++) {
            this.board[0][i] = shuffledBase[i]
        }

        for (let row = 1; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.board[row][col] = this.board[0][(col + row * this.boxSize) % this.size]
            }
        }

        this.shuffleArray(this.board)
        this.solve()
    }
}
