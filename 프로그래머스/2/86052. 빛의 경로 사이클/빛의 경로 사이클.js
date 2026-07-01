function solution(grid) {
    const R = grid.length;
    const C = grid[0].length;

    // 아래, 왼, 위, 오른
    const dr = [-1, 0, 1, 0];
    const dc = [0, -1, 0, 1];

    // 방문 여부 [행][열][방향]
    const visited = Array.from({ length: R }, () =>
        Array.from({ length: C }, () => Array(4).fill(false))
    );

    const answer = [];

    function light(r, c, d) {
        let cnt = 0;

        while (true) {
            if (visited[r][c][d]) break;

            cnt++;
            visited[r][c][d] = true;

            if (grid[r][c] === "L") {
                d = d === 0 ? 3 : d - 1;
            } else if (grid[r][c] === "R") {
                d = d === 3 ? 0 : d + 1;
            }

            r = (r + dr[d] + R) % R;
            c = (c + dc[d] + C) % C;
        }

        return cnt;
    }

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            for (let d = 0; d < 4; d++) {
                if (!visited[i][j][d]) {
                    answer.push(light(i, j, d));
                }
            }
        }
    }

    return answer.sort((a, b) => a - b);
}