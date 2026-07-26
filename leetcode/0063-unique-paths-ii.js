/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    const rows = obstacleGrid.length;
    const cols = obstacleGrid[0].length;

    // 메모이제이션 배열 (-1: 아직 계산하지 않음)
    const memo = Array.from(
        { length: rows },
        () => Array(cols).fill(-1)
    );

    // DFS + 메모이제이션
    const dfs = (row, col) => {
        // 범위를 벗어나거나 장애물을 만난 경우
        if (row >= rows || col >= cols || obstacleGrid[row][col] === 1) {
            return 0;
        }

        // 목적지 도착
        if (row === rows - 1 && col === cols - 1) {
            return 1;
        }

        // 아직 계산하지 않았다면 계산
        if (memo[row][col] === -1) {
            memo[row][col] =
                dfs(row + 1, col) +
                dfs(row, col + 1);
        }

        return memo[row][col];
    };

    // 시작점에서 탐색
    return dfs(0, 0);
};