/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    // 빈 배열 처리
    if (matrix.length === 0 || matrix[0].length === 0) {
        return 0;
    }

    const height = matrix.length;
    const width = matrix[0].length;

    let maxValue = 0;

    // DP 배열 초기화
    const dp = Array.from(
        { length: height },
        () => Array(width).fill(0)
    );

    // 첫 번째 열 초기화
    for (let i = 0; i < height; i++) {
        dp[i][0] = matrix[i][0] === '1' ? 1 : 0;
        maxValue = Math.max(maxValue, dp[i][0]);
    }

    // 첫 번째 행 초기화
    for (let i = 0; i < width; i++) {
        dp[0][i] = matrix[0][i] === '1' ? 1 : 0;
        maxValue = Math.max(maxValue, dp[0][i]);
    }

    // (1, 1)부터 탐색
    for (let i = 1; i < height; i++) {
        for (let j = 1; j < width; j++) {
            if (matrix[i][j] === '1') {
                // 왼쪽, 위쪽, 왼쪽 위 대각선 중 최소값 + 1
                dp[i][j] =
                    Math.min(
                        dp[i][j - 1],
                        dp[i - 1][j],
                        dp[i - 1][j - 1]
                    ) + 1;
            } else {
                dp[i][j] = 0;
            }

            maxValue = Math.max(maxValue, dp[i][j]);
        }
    }

    // 가장 큰 정사각형의 넓이 반환
    return maxValue * maxValue;
};