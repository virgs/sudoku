import { Grid } from './Grid';

export class Board {
    protected readonly grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid
    }

    public printAnswers() {
        const answerLines = this.grid.cells
            .map(line => `|${line.map(cell => ` ${cell.answer} `).join('|')}|\n`)
        console.log(answerLines.join('-'.repeat(answerLines[0].length) + '\n'))
    }
}




