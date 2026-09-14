class NumMatrix {
    prefixSum: number[][];

    constructor(matrix: number[][]) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        this.prefixSum = Array.from(
            { length: rows + 1 },
            () => Array(cols + 1).fill(0)
        );

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.prefixSum[i + 1][j + 1] =
                    this.prefixSum[i + 1][j] +
                    this.prefixSum[i][j + 1] -
                    this.prefixSum[i][j] +
                    matrix[i][j];
            }
        }
    }

    sumRegion(
        row1: number,
        col1: number,
        row2: number,
        col2: number
    ): number {
        return this.prefixSum[row2 + 1][col2 + 1] -
               this.prefixSum[row2 + 1][col1] -
               this.prefixSum[row1][col2 + 1] +
               this.prefixSum[row1][col1];
    }
}