var closedIsland = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [-1, 0, 1, 0, -1];

    const dfs = (row, col) => {
        let isClosed =
            row > 0 && col > 0 && row < rows - 1 && col < cols - 1
                ? 1
                : 0;

        grid[row][col] = 1;

        for (let k = 0; k < 4; k++) {
            const nextRow = row + directions[k];
            const nextCol = col + directions[k + 1];

            if (
                nextRow >= 0 &&
                nextCol >= 0 &&
                nextRow < rows &&
                nextCol < cols &&
                grid[nextRow][nextCol] === 0
            ) {
                isClosed &= dfs(nextRow, nextCol);
            }
        }

        return isClosed;
    };

    let closedIslandCount = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 0) {
                closedIslandCount += dfs(i, j);
            }
        }
    }

    return closedIslandCount;
};