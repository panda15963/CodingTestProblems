/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    const acc = Array.from({ length: m }, () => new Array(n).fill(0));

    // 첫 번째 열을 1로 초기화
    for (let i = 0; i < m; i++) {
        acc[i][0] = 1;
    }

    // 첫 번째 행을 1로 초기화
    for (let i = 0; i < n; i++) {
        acc[0][i] = 1;
    }

    for (let c = 1; c < n; c++) {
        for (let r = 1; r < m; r++) {
            // 현재 위치 = 위쪽 + 왼쪽
            acc[r][c] = acc[r - 1][c] + acc[r][c - 1];
        }
    }

    return acc[m - 1][n - 1];
};