import { Board } from './Board';
import { Grid } from './Grid';

export class BoardCreator {
    private readonly dimension: number;

    public constructor(dimension: number) {
        this.dimension = dimension;
    }

    public createBoardFromText(text: string = ""): Board {
        return new Board(this.createEmptyGrid())
    }

    protected createEmptyGrid(): Grid {
        const dimensionSquared = this.dimension ** 2
        return {
            dimension: dimensionSquared,
            cells: Array.from(Array(dimensionSquared).keys())
                .map(() => Array.from(Array(dimensionSquared).keys())
                    .map(() => ({
                        answer: 0,
                        value: 0
                    })))
        };
    }
}
