/**
 * Determines the winner of Stone Game III using dynamic programming with memoization.
 * Alice and Bob take turns removing stones, Alice goes first.
 * Each player can take 1, 2, or 3 stones from the beginning of the array.
 * The player with the highest total stone value wins.
 *
 * @param {number[]} stoneValue - Array of stone values
 * @returns {"Alice"|"Bob"|"Tie"} - Winner
 */
function stoneGameIII(stoneValue) {
    const n = stoneValue.length;
    const INFINITY = 1 << 30;

    // Memoization array
    const memo = new Array(n).fill(INFINITY);

    /**
     * Calculate maximum score difference current player can achieve
     * starting from index.
     *
     * @param {number} index
     * @returns {number}
     */
    const calculateMaxScoreDifference = (index) => {
        // No stones left
        if (index >= n) {
            return 0;
        }

        // Already calculated
        if (memo[index] !== INFINITY) {
            return memo[index];
        }

        let maxScoreDifference = -INFINITY;
        let currentSum = 0;

        // Take 1, 2, or 3 stones
        for (let stonesCount = 0; stonesCount < 3 && index + stonesCount < n; stonesCount++) {
            currentSum += stoneValue[index + stonesCount];

            // Current player's score - opponent's best score difference
            const scoreDifference =
                currentSum - calculateMaxScoreDifference(index + stonesCount + 1);

            maxScoreDifference = Math.max(
                maxScoreDifference,
                scoreDifference
            );
        }

        memo[index] = maxScoreDifference;
        return maxScoreDifference;
    };

    // Alice starts from index 0
    const aliceScoreDifference = calculateMaxScoreDifference(0);

    // Decide winner
    if (aliceScoreDifference === 0) {
        return "Tie";
    }

    return aliceScoreDifference > 0 ? "Alice" : "Bob";
}