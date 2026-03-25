var canPartitionGrid = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    let total = 0;
    for (const row of grid) {
        for (const val of row) {
            total += val;
        }
    }

    if (total % 2 !== 0) return false;
    const target = total / 2;

    // horizontal
    let sum = 0;
    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n; j++) {
            sum += grid[i][j];
        }
        if (sum === target) return true;
    }

    // vertical
    const colSum = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < m; i++) {
            colSum[j] += grid[i][j];
        }
    }

    sum = 0;
    for (let j = 0; j < n - 1; j++) {
        sum += colSum[j];
        if (sum === target) return true;
    }

    return false;
};