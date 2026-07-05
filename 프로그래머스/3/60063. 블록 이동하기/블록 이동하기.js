function solution(board) {
    const n = board.length;

    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    const rdx = [-1, 1, 1, -1];
    const rdy = [1, 1, -1, -1];

    const visit = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => Array(4).fill(false))
    );

    const queue = [{ x: 0, y: 0, dir: 0, time: 0 }];
    let front = 0;

    visit[0][0][0] = true;

    while (front < queue.length) {
        const robot = queue[front++];

        let { x, y, dir, time } = robot;

        const ox = x + dx[dir];
        const oy = y + dy[dir];

        if (isFinish(x, y) || isFinish(ox, oy)) {
            return time;
        }

        // 상하좌우 이동
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            const nox = ox + dx[i];
            const noy = oy + dy[i];

            if (!isValid(nx, ny) || !isValid(nox, noy)) continue;
            if (board[nx][ny] === 1 || board[nox][noy] === 1) continue;
            if (visit[nx][ny][dir]) continue;

            visit[nx][ny][dir] = true;
            queue.push({
                x: nx,
                y: ny,
                dir,
                time: time + 1
            });
        }

        // x, y를 기준으로 회전
        for (let i = 1; i < 4; i += 2) {
            let ndir = (dir + i) % 4;

            const nox = x + dx[ndir];
            const noy = y + dy[ndir];

            const tempDir = (i === 1) ? ndir : dir;

            const rx = x + rdx[tempDir];
            const ry = y + rdy[tempDir];

            if (!isValid(nox, noy) || !isValid(rx, ry)) continue;
            if (board[nox][noy] === 1 || board[rx][ry] === 1) continue;
            if (visit[x][y][ndir]) continue;

            visit[x][y][ndir] = true;

            queue.push({
                x,
                y,
                dir: ndir,
                time: time + 1
            });
        }

        // 반대 축 기준 회전
        dir = (dir + 2) % 4;

        for (let i = 1; i < 4; i += 2) {
            let ndir = (dir + i) % 4;

            const nx = ox + dx[ndir];
            const ny = oy + dy[ndir];

            const tempDir = (i === 1) ? ndir : dir;

            const rx = ox + rdx[tempDir];
            const ry = oy + rdy[tempDir];

            ndir = (ndir + 2) % 4;

            if (!isValid(nx, ny) || !isValid(rx, ry)) continue;
            if (board[nx][ny] === 1 || board[rx][ry] === 1) continue;
            if (visit[nx][ny][ndir]) continue;

            visit[nx][ny][ndir] = true;

            queue.push({
                x: nx,
                y: ny,
                dir: ndir,
                time: time + 1
            });
        }
    }

    return -1;

    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < n && y < n;
    }

    function isFinish(x, y) {
        return x === n - 1 && y === n - 1;
    }
}