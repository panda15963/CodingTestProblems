function solution(maps) {
    const rows = maps.length;
    const cols = maps[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const result = [];
    
    // 방향 벡터 (상, 하, 좌, 우)
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // 바다가 아니고 방문하지 않은 땅이라면 탐색 시작
            if (maps[i][j] !== 'X' && !visited[i][j]) {
                let sum = 0;
                let queue = [[i, j]];
                visited[i][j] = true;

                while (queue.length > 0) {
                    const [r, c] = queue.shift();
                    sum += parseInt(maps[r][c]);

                    for (let d = 0; d < 4; d++) {
                        const nr = r + dr[d];
                        const nc = c + dc[d];

                        // 범위 내에 있고, 바다가 아니며, 방문하지 않은 땅
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                            maps[nr][nc] !== 'X' && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            queue.push([nr, nc]);
                        }
                    }
                }
                result.push(sum);
            }
        }
    }

    return result.length === 0 ? [-1] : result.sort((a, b) => a - b);
}
