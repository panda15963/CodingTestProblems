/**
 * @param {number[][]} grid
 * @param {number} x
 * @param {number} y
 * @param {number} k
 * @return {number[][]}
 */
function reverseSubmatrix(grid, x, y, k) {
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