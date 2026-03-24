var constructProductMatrix = function(grid) {
    const mod = 12345;
    const n = grid.length;
    const m = grid[0].length;
    const size = n * m;

    const arr = [];

    // flatten
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            arr.push(grid[i][j] % mod);
        }
    }

    const prefix = new Array(size).fill(1);
    for (let i = 1; i < size; i++) {
        prefix[i] = (prefix[i - 1] * arr[i - 1]) % mod;
    }

    const suffix = new Array(size).fill(1);
    for (let i = size - 2; i >= 0; i--) {
        suffix[i] = (suffix[i + 1] * arr[i + 1]) % mod;
    }

    const res = Array.from({ length: n }, () => Array(m).fill(0));

    for (let i = 0; i < size; i++) {
        const val = (prefix[i] * suffix[i]) % mod;
        res[Math.floor(i / m)][i % m] = val;
    }

    return res;
};