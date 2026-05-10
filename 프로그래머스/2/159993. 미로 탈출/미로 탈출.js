function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;
    let start, lever, end;

    // 1. 위치 찾기
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (maps[i][j] === 'S') start = [i, j];
            if (maps[i][j] === 'L') lever = [i, j];
            if (maps[i][j] === 'E') end = [i, j];
        }
    }

    // BFS 함수
    function bfs(startNode, target) {
        const queue = [[...startNode, 0]]; // [y, x, time]
        const visited = Array.from({ length: n }, () => Array(m).fill(false));
        visited[startNode[0]][startNode[1]] = true;
        
        const dy = [-1, 1, 0, 0];
        const dx = [0, 0, -1, 1];

        while (queue.length > 0) {
            const [y, x, time] = queue.shift();

            if (maps[y][x] === target) return time;

            for (let i = 0; i < 4; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];

                if (ny >= 0 && ny < n && nx >= 0 && nx < m && maps[ny][nx] !== 'X' && !visited[ny][nx]) {
                    visited[ny][nx] = true;
                    queue.push([ny, nx, time + 1]);
                }
            }
        }
        return -1;
    }

    // 2. 레버까지 최단 거리
    const timeToLever = bfs(start, 'L');
    if (timeToLever === -1) return -1;

    // 3. 레버에서 출구까지 최단 거리
    const timeToEnd = bfs(lever, 'E');
    if (timeToEnd === -1) return -1;

    return timeToLever + timeToEnd;
}
