function solution(rectangle, characterX, characterY, itemX, itemY) {
    const map = Array.from({ length: 102 }, () =>
        Array(102).fill(0)
    );

    const visited = Array.from({ length: 102 }, () =>
        Array(102).fill(false)
    );

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    // 1. 좌표 2배
    for (const [x1, y1, x2, y2] of rectangle) {
        for (let i = x1 * 2; i <= x2 * 2; i++) {
            for (let j = y1 * 2; j <= y2 * 2; j++) {
                if (map[i][j] === 2) continue;

                if (
                    i === x1 * 2 ||
                    i === x2 * 2 ||
                    j === y1 * 2 ||
                    j === y2 * 2
                ) {
                    map[i][j] = 1;
                } else {
                    map[i][j] = 2;
                }
            }
        }
    }

    const queue = [[characterX * 2, characterY * 2, 0]];
    visited[characterX * 2][characterY * 2] = true;

    while (queue.length) {
        const [x, y, dist] = queue.shift();

        if (x === itemX * 2 && y === itemY * 2) {
            return dist / 2;
        }

        for (let d = 0; d < 4; d++) {
            const nx = x + dx[d];
            const ny = y + dy[d];

            if (
                nx >= 0 &&
                ny >= 0 &&
                nx < 102 &&
                ny < 102 &&
                !visited[nx][ny] &&
                map[nx][ny] === 1
            ) {
                visited[nx][ny] = true;
                queue.push([nx, ny, dist + 1]);
            }
        }
    }

    return 0;
}