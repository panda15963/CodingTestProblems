function solution(game_board, table) {
    const n = game_board.length;
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    let visited;

    function getShapes(board, target) {
        visited = Array.from({ length: n }, () => Array(n).fill(false));
        const shapes = [];

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (!visited[i][j] && board[i][j] === target) {
                    shapes.push(bfs(board, i, j, target));
                }
            }
        }
        return shapes;
    }

    function bfs(board, x, y, target) {
        const queue = [[x, y]];
        const cells = [[x, y]];
        visited[x][y] = true;

        while (queue.length) {
            const [cx, cy] = queue.shift();

            for (let d = 0; d < 4; d++) {
                const nx = cx + dx[d];
                const ny = cy + dy[d];

                if (
                    nx >= 0 && ny >= 0 &&
                    nx < n && ny < n &&
                    !visited[nx][ny] &&
                    board[nx][ny] === target
                ) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                    cells.push([nx, ny]);
                }
            }
        }

        return normalize(cells);
    }

    function normalize(shape) {
        const minX = Math.min(...shape.map(v => v[0]));
        const minY = Math.min(...shape.map(v => v[1]));

        return shape
            .map(([x, y]) => [x - minX, y - minY])
            .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    }

    function rotate(shape) {
        const rotated = shape.map(([x, y]) => [y, -x]);
        return normalize(rotated);
    }

    function equalsShape(a, b) {
        if (a.length !== b.length) return false;
        return a.every((v, i) => v[0] === b[i][0] && v[1] === b[i][1]);
    }

    const blanks = getShapes(game_board, 0);
    const blocks = getShapes(table, 1);

    const used = Array(blocks.length).fill(false);
    let answer = 0;

    for (const blank of blanks) {
        for (let i = 0; i < blocks.length; i++) {
            if (used[i]) continue;

            let block = blocks[i];

            for (let r = 0; r < 4; r++) {
                if (equalsShape(blank, block)) {
                    answer += blank.length;
                    used[i] = true;
                    break;
                }
                block = rotate(block);
            }

            if (used[i]) break;
        }
    }

    return answer;
}