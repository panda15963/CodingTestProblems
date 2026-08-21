/**
 * @param {number[][]} dungeon
 * @return {number}
 */
function calculateMinimumHP(dungeon) {
    const rows = dungeon.length;
    const cols = dungeon[0].length;

    // dp[i][j] = (i, j)에서 오른쪽 아래까지 가기 위해
    // 현재 칸에 들어올 때 필요한 최소 HP
    const dp = Array(rows + 1)
        .fill(null)
        .map(() => Array(cols + 1).fill(Number.MAX_SAFE_INTEGER));

    // 오른쪽 아래 칸의 경계 조건
    dp[rows][cols - 1] = 1;
    dp[rows - 1][cols] = 1;

    // 오른쪽 아래에서 왼쪽 위 방향으로 DP
    for (let i = rows - 1; i >= 0; i--) {
        for (let j = cols - 1; j >= 0; j--) {

            // 오른쪽 또는 아래쪽 중 필요한 HP가 더 적은 경로 선택
            const minHealthRequired =
                Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];

            // HP는 최소 1 이상이어야 함
            dp[i][j] = Math.max(1, minHealthRequired);
        }
    }

    return dp[0][0];
}