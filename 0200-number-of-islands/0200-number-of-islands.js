/**
 * Counts the number of islands in a 2D grid.
 *
 * @param {string[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    const rowCount = grid.length;
    const columnCount = grid[0].length;
    let islandCount = 0;

    /**
     * DFS를 사용해서 연결된 모든 땅을 방문 처리
     *
     * @param {number} row
     * @param {number} column
     */
    const markIslandVisited = (row, column) => {
        // 범위를 벗어나거나 물인 경우 종료
        if (grid[row]?.[column] !== '1') {
            return;
        }

        // 방문 처리
        grid[row][column] = '0';

        // 상, 하, 좌, 우 탐색
        markIslandVisited(row + 1, column);
        markIslandVisited(row - 1, column);
        markIslandVisited(row, column + 1);
        markIslandVisited(row, column - 1);
    };

    // 모든 칸 탐색
    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {

            // 새로운 섬 발견
            if (grid[row][column] === '1') {
                markIslandVisited(row, column);
                islandCount++;
            }
        }
    }

    return islandCount;
}