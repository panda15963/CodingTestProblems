// Union-Find 부모 배열
let parent;
let componentCount;

// Find (경로 압축)
function find(x) {
    if (parent[x] !== x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

// Union
function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA !== rootB) {
        parent[rootA] = rootB;
        componentCount--;
        return true;
    }

    return false;
}

function maximumSafenessFactor(grid) {
    const n = grid.length;

    // 시작 또는 끝에 도둑이 있으면 안전도는 0
    if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
        return 0;
    }

    const queue = [];
    const INF = 1 << 30;

    // 각 칸에서 가장 가까운 도둑까지의 거리
    const dist = Array.from({ length: n }, () =>
        Array(n).fill(INF)
    );

    // 모든 도둑을 BFS 시작점으로 사용
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 1) {
                dist[r][c] = 0;
                queue.push([r, c]);
            }
        }
    }

    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];

    // Multi-source BFS
    let front = 0;
    while (front < queue.length) {
        const [r, c] = queue[front++];

        for (let d = 0; d < 4; d++) {
            const nr = r + dr[d];
            const nc = c + dc[d];

            if (
                nr >= 0 &&
                nr < n &&
                nc >= 0 &&
                nc < n &&
                dist[nr][nc] === INF
            ) {
                dist[nr][nc] = dist[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }

    // (안전도, 행, 열)
    const cells = [];

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            cells.push([dist[r][c], r, c]);
        }
    }

    // 안전도가 높은 순으로 정렬
    cells.sort((a, b) => b[0] - a[0]);

    const total = n * n;

    parent = Array.from({ length: total }, (_, i) => i);
    componentCount = total;

    for (const [safe, r, c] of cells) {
        for (let d = 0; d < 4; d++) {
            const nr = r + dr[d];
            const nc = c + dc[d];

            if (
                nr >= 0 &&
                nr < n &&
                nc >= 0 &&
                nc < n &&
                dist[nr][nc] >= safe
            ) {
                union(r * n + c, nr * n + nc);
            }
        }

        // 시작과 끝이 연결되면 현재 안전도가 정답
        if (find(0) === find(total - 1)) {
            return safe;
        }
    }

    return 0;
}