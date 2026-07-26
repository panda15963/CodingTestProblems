/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    const minCost2d = Array.from(
        { length: rows },
        () => Array(cols).fill(0)
    );

    // 초기화
    minCost2d[0][0] = grid[0][0];

    for (let col = 1; col < cols; col++) {
        minCost2d[0][col] = grid[0][col] + minCost2d[0][col - 1];
    }

    for (let row = 1; row < rows; row++) {
        minCost2d[row][0] = grid[row][0] + minCost2d[row - 1][0];
    }

    // Bottom-Up DP
    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            const upCost = minCost2d[row - 1][col];
            const leftCost = minCost2d[row][col - 1];

            minCost2d[row][col] =
                Math.min(upCost, leftCost) + grid[row][col];
        }
    }

    return minCost2d[rows - 1][cols - 1];
};