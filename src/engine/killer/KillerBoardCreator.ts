import { BoardCreator } from '../BoardCreator'
import { KillerBoard } from './KillerBoard'
import { CageType } from './types/CageType'

export class KillerBoardCreator extends BoardCreator {
    static readonly CELL_REGEXP = /\((\d),\s?(\d)\),(\d)/
    static readonly BOARD_DIMENSION: Point = { x: 9, y: 9 }

    public constructor() {
        super(KillerBoardCreator.BOARD_DIMENSION)
    }

    public createBoardFromText(fileContent: string): KillerBoard {
        const grid = this.createEmptyGrid()
        const cages: CageType[] = []
        fileContent
            .split('\n')
            .filter((cageDefinition) => cageDefinition)
            .forEach((cageDefinition) => {
                const [label, cagesDefinition] = cageDefinition.split('=')
                const cage: CageType = {
                    label: Number(label),
                    cells: [],
                }

                cagesDefinition.split('+').map((cellDefinition) => {
                    const [match, y, x, answer] = cellDefinition
                        .match(KillerBoardCreator.CELL_REGEXP)!
                        .map((item) => Number(item))
                    grid.cells[y][x].answer = answer
                    cage.cells.push({
                        x,
                        y,
                    })
                })
                cages.push(cage)
            })
        return new KillerBoard({
            ...grid,
            cages: cages,
        })
    }
}