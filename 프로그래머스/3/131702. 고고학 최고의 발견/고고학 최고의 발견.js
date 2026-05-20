function solution(clockHands) {
    const N = clockHands.length;
    const dr = [0, -1, 1, 0, 0];
    const dc = [0, 0, 0, -1, 1];
    let minRotation = Infinity;

    // 현재 상태에서 해당 위치의 시계를 돌렸을 때의 변화를 적용하는 함수
    function rotate(board, r, c, count) {
        for (let i = 0; i < 5; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];
            if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
                board[nr][nc] = (board[nr][nc] + count) % 4;
            }
        }
    }

    // 첫 번째 행의 모든 경우의 수를 재귀로 탐색
    function dfs(row, currentHands, rotations) {
        if (row === N) {
            // 두 번째 행부터는 바로 위 행의 시계를 0으로 만들기 위해 필요한 회전 수 적용
            const board = currentHands.map(arr => [...arr]);
            let currentRotations = rotations;

            for (let r = 1; r < N; r++) {
                for (let c = 0; c < N; c++) {
                    const target = (4 - board[r - 1][c]) % 4;
                    if (target > 0) {
                        rotate(board, r, c, target);
                        currentRotations += target;
                    }
                }
            }

            // 모든 시계가 12시(0) 방향이 되었는지 확인
            let isValid = true;
            for (let c = 0; c < N; c++) {
                if (board[N - 1][c] !== 0) {
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                minRotation = Math.min(minRotation, currentRotations);
            }
            return;
        }

        // 첫 번째 행의 각 시계에 대해 0~3번 회전시키는 경우의 수 생성
        for (let i = 0; i < 4; i++) {
            const nextHands = currentHands.map(arr => [...arr]);
            rotate(nextHands, 0, row, i);
            dfs(row + 1, nextHands, rotations + i);
        }
    }

    dfs(0, clockHands, 0);

    return minRotation;
}
