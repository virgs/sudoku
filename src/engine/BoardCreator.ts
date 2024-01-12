import { Board } from './Board';
import { GridType } from './types/GridType';

export class BoardCreator {
    private readonly dimension: number;

    public constructor(dimension: number) {
        this.dimension = dimension;
    }

    public createBoardFromText(text: string = ""): Board {
        return new Board(this.createEmptyGrid())
    }

    protected createEmptyGrid(): GridType {
        return {
            dimension: this.dimension,
            cells: Array.from(Array(this.dimension).keys())
                .map(() => Array.from(Array(this.dimension).keys())
                    .map(() => ({
                        answer: 0,
                        value: 0
                    })))
        };
    }
}
