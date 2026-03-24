function constructProductMatrix(grid: number[][]): number[][] {
    const mod = 12345;
    const n = grid.length;
    const m = grid[0].length;
    const size = n * m;

    const arr: number[] = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            arr.push(grid[i][j] % mod);
        }
    }

    const prefix: number[] = new Array(size).fill(1);
    for (let i = 1; i < size; i++) {
        prefix[i] = (prefix[i - 1] * arr[i - 1]) % mod;
    }

    const suffix: number[] = new Array(size).fill(1);
    for (let i = size - 2; i >= 0; i--) {
        suffix[i] = (suffix[i + 1] * arr[i + 1]) % mod;
    }

    const res: number[][] = Array.from({ length: n }, () => Array(m).fill(0));

    for (let i = 0; i < size; i++) {
        res[Math.floor(i / m)][i % m] = (prefix[i] * suffix[i]) % mod;
    }

    return res;
}