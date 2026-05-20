function solution(beginning, target) {
    const R = beginning.length;
    const C = beginning[0].length;
    let minFlips = Infinity;

    // 1. DFS로 행을 뒤집는 모든 경우의 수 탐색 (2^R)
    function dfs(rowIdx, currentBoard, flipCount) {
        if (rowIdx === R) {
            // 모든 행의 상태가 결정되면 열을 맞추기 위한 체크 진행
            checkColumns(currentBoard, flipCount);
            return;
        }

        // 경우 1: 현재 행을 뒤집지 않는 경우
        dfs(rowIdx + 1, currentBoard, flipCount);

        // 경우 2: 현재 행을 뒤집는 경우
        const flippedBoard = currentBoard.map((row, r) =>
            r === rowIdx ? row.map(val => 1 - val) : [...row]
        );
        dfs(rowIdx + 1, flippedBoard, flipCount + 1);
    }

    // 2. 각 열을 타겟과 일치시킬지 확인
    function checkColumns(board, rowFlips) {
        let currentFlips = rowFlips;

        for (let c = 0; c < C; c++) {
            let needsFlip = false;
            let firstVal = board[0][c];

            // 현재 열의 첫 번째 행 값이 target과 다르면 뒤집어야 함
            if (firstVal !== target[0][c]) {
                needsFlip = true;
            }

            // 열의 나머지 행들도 같은 상태인지 확인 (행 뒤집기를 마친 상태이므로 모두 같아야 함)
            for (let r = 0; r < R; r++) {
                if ((needsFlip ? 1 - board[r][c] : board[r][c]) !== target[r][c]) {
                    return; // 불가능한 경우면 종료
                }
            }

            if (needsFlip) {
                currentFlips++;
            }
        }

        // 최솟값 갱신
        minFlips = Math.min(minFlips, currentFlips);
    }

    dfs(0, beginning, 0);

    return minFlips === Infinity ? -1 : minFlips;
}
