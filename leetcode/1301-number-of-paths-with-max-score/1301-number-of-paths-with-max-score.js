function pathsWithMaxScore(board) {
    const boardSize = board.length;
    const MOD = 1000000007;

    // maxScore[i][j] : (i,j)에서 도착점까지 갈 수 있는 최대 점수
    const maxScore = Array.from({ length: boardSize }, () =>
        Array(boardSize).fill(-1)
    );

    // pathCount[i][j] : 최대 점수를 만드는 경로의 개수
    const pathCount = Array.from({ length: boardSize }, () =>
        Array(boardSize).fill(0)
    );

    // 도착점 초기화
    maxScore[boardSize - 1][boardSize - 1] = 0;
    pathCount[boardSize - 1][boardSize - 1] = 1;

    function updateCell(i, j, prevX, prevY) {
        // 범위를 벗어나거나 갈 수 없는 경우
        if (
            prevX >= boardSize ||
            prevY >= boardSize ||
            maxScore[prevX][prevY] === -1 ||
            board[i][j] === "X" ||
            board[i][j] === "S"
        ) {
            return;
        }

        // 더 큰 점수를 만드는 경우
        if (maxScore[prevX][prevY] > maxScore[i][j]) {
            maxScore[i][j] = maxScore[prevX][prevY];
            pathCount[i][j] = pathCount[prevX][prevY];
        }
        // 같은 점수를 만드는 경우
        else if (maxScore[prevX][prevY] === maxScore[i][j]) {
            pathCount[i][j] =
                (pathCount[i][j] + pathCount[prevX][prevY]) % MOD;
        }
    }

    // DP 계산
    for (let i = boardSize - 1; i >= 0; i--) {
        for (let j = boardSize - 1; j >= 0; j--) {
            updateCell(i, j, i + 1, j);      // 아래
            updateCell(i, j, i, j + 1);      // 오른쪽
            updateCell(i, j, i + 1, j + 1);  // 대각선

            if (maxScore[i][j] !== -1) {
                const cell = board[i][j];
                if (cell >= "0" && cell <= "9") {
                    maxScore[i][j] += Number(cell);
                }
            }
        }
    }

    if (maxScore[0][0] === -1) {
        return [0, 0];
    }

    return [maxScore[0][0], pathCount[0][0]];
}