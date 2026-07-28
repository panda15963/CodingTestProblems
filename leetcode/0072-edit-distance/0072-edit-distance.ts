/**
 * @param word1
 * @param word2
 * @returns
 */
function minDistance(word1: string, word2: string): number {
    const row: number = word1.length;
    const col: number = word2.length;

    const dp: number[][] = Array.from({ length: row + 1 }, () =>
        Array(col + 1).fill(0)
    );

    for (let i = 1; i <= row; i++) {
        dp[i][0] = i;
    }

    for (let j = 1; j <= col; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= row; i++) {
        for (let j = 1; j <= col; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] =
                    Math.min(
                        dp[i - 1][j],
                        dp[i - 1][j - 1],
                        dp[i][j - 1]
                    ) + 1;
            }
        }
    }

    return dp[row][col];
}