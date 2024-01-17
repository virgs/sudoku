import { Point } from '../math/Point'
import { Board } from './Board'
import { GameLevel } from './types/AvailableGames'
import { GridType } from './types/GridType'

import { MatrixOperationsType } from '../math/Matrix'

export abstract class BoardCreator {
    private readonly matricesOperationsShuffle: MatrixOperationsType[]
    protected readonly dimension

    public constructor(validMatricesOperations: MatrixOperationsType[], dimension: Point) {
        this.dimension = dimension
        this.matricesOperationsShuffle = validMatricesOperations
            .sort(() => Math.random() - 0.5)
            .filter(() => Math.random() > 0.5)
    }

    public abstract createBoard(level: GameLevel): Promise<Board>

    protected createSquareRegions(numberOfRegions: Point, regionDimension: Point) {
        const regions: Point[][] = []
        Array.from(Array(numberOfRegions.y).keys()).forEach((regionY) =>
            Array.from(Array(numberOfRegions.x).keys()).forEach((regionX) => {
                const currentRegion: Point[] = []
                Array.from(Array(regionDimension.y).keys()).forEach((y) =>
                    Array.from(Array(regionDimension.x).keys()).forEach((x) => {
                        currentRegion.push({
                            y: regionY * regionDimension.y + y,
                            x: regionX * regionDimension.x + x,
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
