import { describe, expect, it } from 'vitest'
import { MatrixOperations } from './Matrix'

describe('MatrixOperations', () => {
    const matrix = new MatrixOperations({ x: 9, y: 9 })

    it('transposes a point', () => {
        expect(matrix.transposePoint({ x: 2, y: 5 })).toEqual({ x: 5, y: 2 })
    })

    it('flips horizontally based on matrix dimension', () => {
        expect(matrix.flipHorizontally({ x: 2, y: 5 })).toEqual({ x: 6, y: 5 })
    })

    it('flips vertically based on matrix dimension', () => {
        expect(matrix.flipVertically({ x: 2, y: 5 })).toEqual({ x: 2, y: 3 })
    })

    it('rotates point clockwise', () => {
        expect(matrix.rotateClockwise({ x: 2, y: 5 })).toEqual({ x: 3, y: 2 })
    })
})
