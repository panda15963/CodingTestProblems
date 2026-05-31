function solution(board, commands) {
    const moves = [
        [0, 0], // 버림
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    const index = Array.from({ length: 101 }, () => [0, 0, 0]);
    // [행, 열, 크기]

    // 초기 위치 및 크기 계산
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length;) {
            const id = board[i][j];

            if (id === 0 || index[id][2] !== 0) {
                j++;
                continue;
            }

            index[id][0] = i;
            index[id][1] = j;

            let size = 0;
            do {
                j++;
                size++;
            } while (j < board[i].length && board[i][j] === id);

            index[id][2] = size;
        }
    }

    // 이동 처리
    for (let i = 0; i < commands.length; i++) {
        const movePos = moves[commands[i][1]];

        const moveApp = [];
        const moveOpposite = [];
        const movedThisTurn = new Set();

        moveApp.push(commands[i][0]);
        movedThisTurn.add(commands[i][0]);
        movedThisTurn.add(0);

        while (moveApp.length !== 0 || moveOpposite.length !== 0) {
            let target;

            if (moveApp.length !== 0) {
                target = moveApp.shift();
            } else {
                movedThisTurn.clear();
                movedThisTurn.add(0);
                target = moveOpposite.shift();
                movedThisTurn.add(target);
            }

            // 삭제
            for (
                let j = Math.max(0, index[target][0]);
                j < Math.min(board.length, index[target][0] + index[target][2]);
                j++
            ) {
                for (
                    let k = Math.max(0, index[target][1]);
                    k < Math.min(board[0].length, index[target][1] + index[target][2]);
                    k++
                ) {
                    if (board[j][k] === target) {
                        board[j][k] = 0;
                    }
                }
            }

            // 반대 방향 처리
            if (movePos[1] === 1 && index[target][1] + movePos[1] + index[target][2] > board[0].length) {
                index[target][1] = -index[target][2];
                for (let j = 0; j < index[target][2]; j++) {
                    moveOpposite.push(target);
                }
                continue;
            } else if (movePos[0] === 1 && index[target][0] + movePos[0] + index[target][2] > board.length) {
                index[target][0] = -index[target][2];
                for (let j = 0; j < index[target][2]; j++) {
                    moveOpposite.push(target);
                }
                continue;
            } else if (movePos[1] === -1 && index[target][1] + movePos[1] < 0) {
                index[target][1] = board[0].length;
                for (let j = 0; j < index[target][2]; j++) {
                    moveOpposite.push(target);
                }
                continue;
            } else if (movePos[0] === -1 && index[target][0] + movePos[0] < 0) {
                index[target][0] = board.length;
                for (let j = 0; j < index[target][2]; j++) {
                    moveOpposite.push(target);
                }
                continue;
            } else {
                index[target][0] += movePos[0];
                index[target][1] += movePos[1];
            }

            // 생성
            const stompedApp = new Set();
            stompedApp.add(0);

            for (
                let j = Math.max(0, index[target][0]);
                j < Math.min(board.length, index[target][0] + index[target][2]);
                j++
            ) {
                for (
                    let k = Math.max(0, index[target][1]);
                    k < Math.min(board[0].length, index[target][1] + index[target][2]);
                    k++
                ) {
                    if (!movedThisTurn.has(board[j][k])) {
                        moveApp.push(board[j][k]);
                        movedThisTurn.add(board[j][k]);
                    }
                    board[j][k] = target;
                }
            }
        }
    }

    return board;
}