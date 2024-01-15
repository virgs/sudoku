export class Matrix<T> {
    public transpose(matrix: T[][]): T[][] {
        const numRows = matrix.length
        const numCols = matrix[0].length

        const transposedMatrix: T[][] = []

        for (let i = 0; i < numCols; i++) {
            transposedMatrix[i] = []
            for (let j = 0; j < numRows; j++) {
                transposedMatrix[i][j] = matrix[j][i]
            }
        }

        return transposedMatrix
    }

    public flipHorizontally(matrix: T[][]): T[][] {
        return matrix.map((row) => row.reverse())
    }

    public rotateClockwise(matrix: T[][]): T[][] {
        return this.flipHorizontally(this.transpose(matrix))
    }
}
