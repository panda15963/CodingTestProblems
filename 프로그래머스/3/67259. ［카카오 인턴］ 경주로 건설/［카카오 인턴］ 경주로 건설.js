function solution(board) {
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    const N = board.length;

    const cost = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => Array(4).fill(Number.MAX_SAFE_INTEGER))
    );

    const queue = [];
    let front = 0;

    // [y, x, cost, direction]
    queue.push([0, 0, 0, 1]);
    queue.push([0, 0, 0, 3]);

    while (front < queue.length) {
        const [y, x, curCost, dir] = queue[front++];

        for (let k = 0; k < 4; k++) {
            const ny = y + dy[k];
            const nx = x + dx[k];
            const nextCost = curCost + (dir === k ? 100 : 600);

            if (
                ny < 0 ||
                nx < 0 ||
                ny >= N ||
                nx >= N ||
                board[ny][nx] === 1 ||
                cost[ny][nx][k] <= nextCost
            ) {
                continue;
            }

            cost[ny][nx][k] = nextCost;
            queue.push([ny, nx, nextCost, k]);
        }
    }

    return Math.min(...cost[N - 1][N - 1]);
}