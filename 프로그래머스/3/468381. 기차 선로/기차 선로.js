function solution(grid) {
    const n = grid.length;
    const m = grid[0].length;
    let answer = 0;

    // 선로 방향 정의: 0:상, 1:하, 2:좌, 3:우
    const tracks = {
        1: [0, 0, 1, 1], // ─
        2: [1, 1, 0, 0], // │
        3: [1, 1, 1, 1], // ┼ (교차)
        4: [1, 0, 1, 0], // ┘ (상좌)
        5: [1, 0, 0, 1], // └ (상우)
        6: [0, 1, 0, 1], // ┌ (하우)
        7: [0, 1, 1, 0]  // ┐ (하좌)
    };

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    const op = [1, 0, 3, 2]; // 반대 방향

    // 원래 격자에 고정된 선로들의 위치 파악
    const fixedTracks = [];
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            if (grid[r][c] > 0) fixedTracks.push({ r, c, type: grid[r][c] });
        }
    }

    // path: 현재까지의 경로 좌표들
    // visitedCount: 각 셀별 방문 횟수
    const visitedCount = Array.from({ length: n }, () => Array(m).fill(0));

    function dfs(r, c, inDir) {
        // 1. 범위를 벗어나거나 장애물이면 종료
        if (r < 0 || r >= n || c < 0 || c >= m || grid[r][c] === -1) return;

        const currentType = grid[r][c];

        // 2. 이미 선로가 있는 경우 (고정 선로 혹은 이미 설치한 선로)
        if (currentType > 0) {
            if (!tracks[currentType][inDir]) return; // 진입 불가 방향

            visitedCount[r][c]++;

            // 3번 선로는 최대 2번, 나머지는 1번만 방문 가능
            if ((currentType === 3 && visitedCount[r][c] > 2) || (currentType !== 3 && visitedCount[r][c] > 1)) {
                visitedCount[r][c]--;
                return;
            }

            let outDir;
            if (currentType === 3) {
                outDir = op[inDir]; // 3번은 무조건 직진
            } else {
                outDir = tracks[currentType].findIndex((v, i) => v === 1 && i !== inDir);
            }

            checkAndMove(r, c, outDir);
            visitedCount[r][c]--;
        } 
        // 3. 빈칸(0)인 경우: 가능한 선로를 하나씩 설치해봄
        else {
            for (let t = 1; t <= 7; t++) {
                if (!tracks[t][inDir]) continue;

                grid[r][c] = t;
                visitedCount[r][c]++;

                let outDir;
                if (t === 3) outDir = op[inDir];
                else outDir = tracks[t].findIndex((v, i) => v === 1 && i !== inDir);

                checkAndMove(r, c, outDir);

                visitedCount[r][c]--;
                grid[r][c] = 0; // 백트래킹
            }
        }
    }

    function checkAndMove(r, c, outDir) {
        // 도착점 도달 확인
        if (r === n - 1 && c === m - 1) {
            // 모든 고정 선로 방문 확인 및 3번 선로 4방향 연결 확인
            if (isPerfect()) answer++;
            // 도착점에서도 더 갈 수 있는 경로가 있을 수 있으므로 리턴하지 않음 (3번 선로 때문)
        }

        const nr = r + dr[outDir];
        const nc = c + dc[outDir];
        dfs(nr, nc, op[outDir]);
    }

    function isPerfect() {
        // 1. 모든 고정 선로를 최소 한 번 이상 지났는가?
        for (const ft of fixedTracks) {
            if (visitedCount[ft.r][ft.c] === 0) return false;
        }
        // 2. 설치된 모든 3번 선로가 2번(가로/세로) 지났는가? (4방향 연결 조건)
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < m; c++) {
                if (grid[r][c] === 3 && visitedCount[r][c] < 2) return false;
                // 3. 설치된 다른 선로들도 모두 방문했는가?
                if (grid[r][c] > 0 && visitedCount[r][c] === 0) return false;
            }
        }
        return true;
    }

    // 시작: (0,0) 위치에서 왼쪽(2)에서 들어오는 방향으로 시작 (오른쪽으로 나감)
    dfs(0, 0, 2);

    return answer;
}