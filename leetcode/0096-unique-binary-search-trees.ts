/**
 * Returns the number of structurally unique BSTs that store values 1...n.
 *
 * @param n - Number of nodes
 * @returns Number of unique Binary Search Trees
 */
function numTrees(n: number): number {
    const dp: number[] = new Array(n + 1).fill(0);

    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }

    return dp[n];
}