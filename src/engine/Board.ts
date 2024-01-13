import { GridType } from './types/GridType'

export class Board {
    protected readonly _grid: GridType

    constructor({ grid }: { grid: GridType }) {
        this._grid = grid
    }

    public get grid(): GridType {
        return this._grid
    }

    public printAnswers() {
        const answerLines = this.grid.cells.map((line) => `|${line.map((cell) => ` ${cell.answer} `).join('|')}|\n`)
        console.log(answerLines.join('-'.repeat(answerLines[0].length) + '\n'))
    }

    //detect violations
}
