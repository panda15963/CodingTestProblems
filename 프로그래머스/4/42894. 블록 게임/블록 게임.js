const BLOCKS = [
    new Set(["0,0", "1,0", "1,1", "1,2"]),
    new Set(["0,1", "1,1", "2,0", "2,1"]),
    new Set(["0,0", "1,0", "2,0", "2,1"]),
    new Set(["0,2", "1,0", "1,1", "1,2"]),
    new Set(["0,1", "1,0", "1,1", "1,2"])
];

// 하나의 블록 덩어리 탐색 (BFS)
function bfs(sx, sy, visited, board) {
    const n = board.length;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    visited[sx][sy] = true;

    const block = [[sx, sy]];
    const blockType = board[sx][sy];

    const queue = [[sx, sy]];
    let front = 0;

    while (front < queue.length) {
        const [x, y] = queue[front++];

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (
                nx >= 0 &&
                nx < n &&
                ny >= 0 &&
                ny < n &&
                !visited[nx][ny] &&
                board[nx][ny] === blockType
            ) {
                visited[nx][ny] = true;
                block.push([nx, ny]);
                queue.push([nx, ny]);
            }
        }
    }

    return block;
}

function isPossibleRemove(block, board) {

    const minX = Math.min(...block.map(([x]) => x));
    const minY = Math.min(...block.map(([, y]) => y));

    const standard = new Set(
        block.map(([x, y]) => `${x - minX},${y - minY}`)
    );

    const matched = BLOCKS.some(shape => {
        if (shape.size !== standard.size) return false;

        for (const p of shape) {
            if (!standard.has(p)) return false;
        }

        return true;
    });

    if (matched && !isBlindAbove(block, board)) {
        return true;
    }

    return false;
}

function isBlindAbove(block, board) {

    const yCount = new Map();

    for (const [, y] of block) {
        yCount.set(y, (yCount.get(y) || 0) + 1);
    }

    const checkBlock = block.filter(
        ([, y]) => yCount.get(y) === 1
    );

    for (const [sx, y] of checkBlock) {

        let x = sx - 1;

        while (x >= 0) {

            if (board[x][y] !== 0) {
                return true;
            }

            x--;
        }
    }

    return false;
}

function removeBlock(block, board) {
    for (const [x, y] of block) {
        board[x][y] = 0;
    }
}

function checkBoard(board) {

    const n = board.length;

    const visited = Array.from(
        { length: n },
        () => Array(n).fill(false)
    );

    let result = 0;

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {

            if (board[row][col] !== 0 && !visited[row][col]) {

                const block = bfs(row, col, visited, board);

                if (isPossibleRemove(block, board)) {
                    result++;
                    removeBlock(block, board);
                }
            }
        }
    }

    return result;
}

function solution(board) {

    let answer = 0;
    let removeCount = -1;

    while (removeCount !== 0) {
        removeCount = checkBoard(board);
        answer += removeCount;
    }

    return answer;
}