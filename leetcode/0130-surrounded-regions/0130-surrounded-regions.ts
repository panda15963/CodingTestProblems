function solve(board: string[][]): void {
    const m: number = board.length;

    if (m === 0) {
        return;
    }

    const n: number = board[0].length;

    const dx: number[] = [-1, 1, 0, 0];
    const dy: number[] = [0, 0, -1, 1];

    const check: boolean[][] = Array.from(
        { length: m },
        () => Array(n).fill(false)
    );

    function dfs(
        x: number,
        y: number,
        setToX: boolean
    ): void {
        if (board[x][y] === 'X' || check[x][y]) {
            return;
        }

        const queue: [number, number][] = [[x, y]];
        check[x][y] = true;

        let index: number = 0;

        while (index < queue.length) {
            const [currentX, currentY] = queue[index++];

            if (setToX) {
                board[currentX][currentY] = 'X';
            }

            for (let i = 0; i < 4; i++) {
                const nx: number = currentX + dx[i];
                const ny: number = currentY + dy[i];

                if (
                    nx < 0 ||
                    nx >= m ||
                    ny < 0 ||
                    ny >= n
                ) {
                    continue;
                }

                if (check[nx][ny]) {
                    continue;
                }

                if (board[nx][ny] === 'X') {
                    continue;
                }

                check[nx][ny] = true;
                queue.push([nx, ny]);
            }
        }
    }

    // 테두리의 O부터 탐색
    for (let i = 0; i < m; i++) {
        dfs(i, 0, false);
        dfs(i, n - 1, false);
    }

    for (let j = 0; j < n; j++) {
        dfs(0, j, false);
        dfs(m - 1, j, false);
    }

    // 방문하지 않은 O를 X로 변경
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, true);
        }
    }
}