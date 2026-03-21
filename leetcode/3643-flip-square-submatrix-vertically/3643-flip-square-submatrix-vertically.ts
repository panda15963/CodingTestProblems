function reverseSubmatrix(
    grid: number[][],
    x: number,
    y: number,
    k: number
): number[][] {
    let top = x;
    let bottom = x + k - 1;

    while (top < bottom) {
        for (let c = 0; c < k; c++) {
            const temp = grid[top][y + c];
            grid[top][y + c] = grid[bottom][y + c];
            grid[bottom][y + c] = temp;
        }
        top++;
        bottom--;
    }

    return grid;
}