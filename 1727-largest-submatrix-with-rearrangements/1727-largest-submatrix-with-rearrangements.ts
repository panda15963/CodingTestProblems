function largestSubmatrix(matrix: number[][]): number {
    const m = matrix.length;
    const n = matrix[0].length;

    // 1. height 누적
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                matrix[i][j] += matrix[i - 1][j];
            }
        }
    }

    let maxArea = 0;

    // 2. 정렬 + 3. 넓이 계산
    for (const row of matrix) {
        row.sort((a, b) => b - a);

        for (let j = 0; j < n; j++) {
            const height = row[j];
            const width = j + 1;
            maxArea = Math.max(maxArea, height * width);
        }
    }

    return maxArea;
}