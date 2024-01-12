import { BoardCreator } from '../BoardCreator';
import { Grid } from '../Grid';
import { Cage } from './Cage';
import { KillerBoard } from './KillerBoard';

export class KillerBoardCreator extends BoardCreator {
    static readonly CELL_REGEXP = /\((\d),\s?(\d)\),(\d)/
    static readonly BOARD_DIMENSION = 3

    public constructor() {
        super(KillerBoardCreator.BOARD_DIMENSION)
    }

    public createBoardFromText(fileContent: string): KillerBoard {
        const grid: Grid = this.createEmptyGrid()
        const cages: Cage[] = []
        fileContent
            .split('\n')
            .filter(cageDefinition => cageDefinition)
            .forEach(cageDefinition => {
                const [label, cagesDefinition] = cageDefinition
                    .split('=')
                const cells = cagesDefinition
                    .split('+')
                    .map(cellDefinition => {
                        const [match, y, x, answer] = cellDefinition.match(KillerBoardCreator.CELL_REGEXP)!
                            .map(item => Number(item))
                        grid.cells[y][x].answer = answer
                        return grid.cells[y][x]
                    })
                cages.push({
                    label: Number(label),
                    cells: cells
                })
            })
        return new KillerBoard({
            ...grid,
            cages: cages,
        })
    }

}
