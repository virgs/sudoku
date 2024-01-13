import { Point } from '../math/Point'
import { Board } from './Board'
import { GridType } from './types/GridType'

export class BoardCreator {
    private readonly dimension: Point

    public constructor(dimension: Point) {
        this.dimension = dimension
    }

    public createBoardFromText(text: string = ''): Board {
        return new Board({ grid: this.createEmptyGrid() })
    }

    protected createEmptyGrid(): GridType {
        return {
            dimension: this.dimension,
            cells: Array.from(Array(this.dimension.y).keys()).map(() =>
                Array.from(Array(this.dimension.x).keys()).map(() => ({
                    answer: 0,
                    revealed: false
                }))
            ),
        }
    }
}
