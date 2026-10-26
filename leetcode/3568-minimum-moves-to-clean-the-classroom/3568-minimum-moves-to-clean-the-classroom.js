/**
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function(classroom, energy) {
    const m = classroom.length;
    const n = classroom[0].length;

    // 각 전등(L)의 인덱스 저장
    const d = Array.from(
        { length: m },
        () => Array(n).fill(0)
    );

    let x = 0;
    let y = 0;
    let cnt = 0;

    // 시작 위치(S)와 전등(L) 찾기
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            const c = classroom[i][j];

            if (c === 'S') {
                x = i;
                y = j;
            } else if (c === 'L') {
                d[i][j] = cnt++;
            }
        }
    }

    // 전등이 없는 경우
    if (cnt === 0) {
        return 0;
    }

    /*
     * 방문 배열
     * vis[row][col][energy][mask]
     */
    const vis = Array.from(
        { length: m },
        () =>
            Array.from(
                { length: n },
                () =>
                    Array.from(
                        { length: energy + 1 },
                        () => new Uint8Array(1 << cnt)
                    )
            )
    );

    // BFS Queue
    // [row, col, currentEnergy, lightsMask]
    let q = [
        [x, y, energy, (1 << cnt) - 1]
    ];

    // 초기 상태 방문 처리
    vis[x][y][energy][(1 << cnt) - 1] = 1;

    // 상, 우, 하, 좌
    const dirs = [-1, 0, 1, 0, -1];

    let ans = 0;

    // BFS
    while (q.length) {
        const t = q;
        q = [];

        // 현재 레벨 탐색
        for (const [i, j, curEnergy, mask] of t) {
            // 모든 전등을 끈 경우
            if (mask === 0) {
                return ans;
            }

            // 에너지가 없으면 이동 불가
            if (curEnergy <= 0) {
                continue;
            }

            // 4방향 탐색
            for (let k = 0; k < 4; ++k) {
                const nx = i + dirs[k];
                const ny = j + dirs[k + 1];

                // 범위 및 벽 확인
                if (
                    nx >= 0 &&
                    nx < m &&
                    ny >= 0 &&
                    ny < n &&
                    classroom[nx][ny] !== 'X'
                ) {
                    const nextCell = classroom[nx][ny];

                    // 충전소(R)에 도착하면 에너지 충전
                    const nxtEnergy =
                        nextCell === 'R'
                            ? energy
                            : curEnergy - 1;

                    let nxtMask = mask;

                    // 전등(L)에 도착하면 끄기
                    if (nextCell === 'L') {
                        nxtMask &=
                            ~(1 << d[nx][ny]);
                    }

                    // 방문하지 않은 상태만 추가
                    if (!vis[nx][ny][nxtEnergy][nxtMask]) {
                        vis[nx][ny][nxtEnergy][nxtMask] = 1;

                        q.push([
                            nx,
                            ny,
                            nxtEnergy,
                            nxtMask
                        ]);
                    }
                }
            }
        }

        ++ans;
    }

    return -1;
};