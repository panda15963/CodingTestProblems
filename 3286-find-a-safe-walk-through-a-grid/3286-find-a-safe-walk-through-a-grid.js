function findSafeWalk(grid, health) {
    // 격자 크기
    const rows = grid.length;
    const cols = grid[0].length;

    // 각 칸까지의 최소 위험도
    const minDanger = Array.from(
        { length: rows },
        () => Array(cols).fill(Infinity)
    );

    // 시작점
    minDanger[0][0] = grid[0][0];

    // BFS 큐
    const queue = [[0, 0]];
    let front = 0;

    // 상, 우, 하, 좌
    const directions = [-1, 0, 1, 0, -1];

    while (front < queue.length) {
        const [currentRow, currentCol] = queue[front++];

        for (let i = 0; i < 4; i++) {
            const nextRow = currentRow + directions[i];
            const nextCol = currentCol + directions[i + 1];

            if (
                nextRow >= 0 &&
                nextRow < rows &&
                nextCol >= 0 &&
                nextCol < cols &&
                minDanger[nextRow][nextCol] >
                    minDanger[currentRow][currentCol] + grid[nextRow][nextCol]
            ) {
                minDanger[nextRow][nextCol] =
                    minDanger[currentRow][currentCol] + grid[nextRow][nextCol];

                queue.push([nextRow, nextCol]);
            }
        }
    }

    // 목적지까지의 최소 위험도가 health보다 작으면 이동 가능
    return minDanger[rows - 1][cols - 1] < health;
}