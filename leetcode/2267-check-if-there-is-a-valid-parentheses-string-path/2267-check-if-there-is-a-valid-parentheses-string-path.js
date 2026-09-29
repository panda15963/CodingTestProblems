var hasValidPath = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    if (
        (rows + cols - 1) % 2 !== 0 ||
        grid[0][0] === ')' ||
        grid[rows - 1][cols - 1] === '('
    ) {
        return false;
    }

    const visited = Array.from(
        { length: rows },
        () =>
            Array.from(
                { length: cols },
                () => new Array(rows + cols).fill(false)
            )
    );

    const directions = [1, 0, 1];

    const dfs = (row, col, balance) => {
        if (visited[row][col][balance]) {
            return false;
        }

        visited[row][col][balance] = true;

        balance += grid[row][col] === '(' ? 1 : -1;

        const remainingCells =
            (rows - row - 1) +
            (cols - col - 1);

        if (
            balance < 0 ||
            balance > remainingCells
        ) {
            return false;
        }

        if (
            row === rows - 1 &&
            col === cols - 1
        ) {
            return balance === 0;
        }

        for (let dirIndex = 0; dirIndex < 2; dirIndex++) {
            const nextRow =
                row + directions[dirIndex];

            const nextCol =
                col + directions[dirIndex + 1];

            if (
                nextRow >= 0 &&
                nextRow < rows &&
                nextCol >= 0 &&
                nextCol < cols &&
                dfs(nextRow, nextCol, balance)
            ) {
                return true;
            }
        }

        return false;
    };

    return dfs(0, 0, 0);
};