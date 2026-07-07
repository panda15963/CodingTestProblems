function solution(n) {
    let cnt = 0;
    const visited = Array.from({ length: n }, () => Array(n).fill(false));

    nQueen(0);

    return cnt;

    function nQueen(queen) {
        // 마지막 퀸까지 모두 배치한 경우
        if (queen === n) {
            cnt++;
            return;
        }

        for (let i = 0; i < n; i++) {
            if (canPlace(queen, i)) {
                visited[queen][i] = true; // 퀸 배치
                nQueen(queen + 1);
                visited[queen][i] = false; // 퀸 배치 해제
            }
        }
    }

    function canPlace(row, col) {
        // 세로 검사
        for (let i = 0; i < n; i++) {
            if (i !== row && visited[i][col]) {
                return false;
            }
        }

        // 대각선 검사
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // 1. 우측 대각선: row - col == i - j
                // 2. 좌측 대각선: row + col == i + j
                if (row - col === i - j || row + col === i + j) {
                    if (visited[i][j]) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}