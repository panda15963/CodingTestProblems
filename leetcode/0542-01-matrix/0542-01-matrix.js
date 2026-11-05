var updateMatrix = function(mat) {
    const rows = mat.length;
    const cols = mat[0].length;

    // 방문하지 않은 셀은 -1로 초기화
    const distanceMatrix = Array.from(
        { length: rows },
        () => Array(cols).fill(-1)
    );

    // 모든 0을 BFS 시작점으로 등록
    const bfsQueue = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (mat[row][col] === 0) {
                bfsQueue.push([row, col]);
                distanceMatrix[row][col] = 0;
            }
        }
    }

    // 상, 우, 하, 좌 방향
    const directions = [-1, 0, 1, 0, -1];

    // 다중 시작점 BFS
    for (let i = 0; i < bfsQueue.length; i++) {
        const [currentRow, currentCol] = bfsQueue[i];

        for (let k = 0; k < 4; k++) {
            const nextRow = currentRow + directions[k];
            const nextCol = currentCol + directions[k + 1];

            if (
                nextRow >= 0 &&
                nextRow < rows &&
                nextCol >= 0 &&
                nextCol < cols &&
                distanceMatrix[nextRow][nextCol] === -1
            ) {
                distanceMatrix[nextRow][nextCol] =
                    distanceMatrix[currentRow][currentCol] + 1;

                bfsQueue.push([nextRow, nextCol]);
            }
        }
    }

    return distanceMatrix;
};