import { Point } from './Point'

export type MatrixOperationsType = (point: Point) => Point

export class MatrixOperations {
    private readonly dimension: Point
    public constructor(dimension: Point) {
        this.dimension = dimension
    }

    public transposePoint(point: Point): Point {
        return {
            x: point.y,
            y: point.x,
        }
    }

    public flipHorizontally(point: Point): Point {
        return {
            x: this.dimension.x - point.x - 1,
            y: point.y,
        }
    }

    public flipVertically(point: Point): Point {
        return {
            y: this.dimension.y - point.y - 1,
            x: point.x,
        }
    }

    public rotateClockwise(point: Point): Point {
        return this.flipHorizontally(this.transposePoint(point))
    }
}
