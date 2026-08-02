/**
 * Determines if the first player can win the stone game
 * @param {number[]} piles - Array of stone piles where each element represents the number of stones in that pile
 * @returns {boolean} true if the first player can win, false otherwise
 */
function stoneGame(piles) {
    const pileCount = piles.length;

    // Memoization table to store computed results
    // memo[i][j] represents the maximum score difference the current player can achieve
    // when choosing from piles[i] to piles[j]
    const memo = Array.from({ length: pileCount }, () =>
        Array(pileCount).fill(0)
    );

    /**
     * Recursively calculates the maximum score difference for the current player
     * @param {number} left - Left boundary index of available piles
     * @param {number} right - Right boundary index of available piles
     * @returns {number} Maximum score difference the current player can achieve
     */
    function calculateMaxScoreDifference(left, right) {
        // Base case: no piles left to choose from
        if (left > right) {
            return 0;
        }

        // Check if result is already computed (memoization)
        if (memo[left][right] === 0) {
            // Choose left pile
            const chooseLeft =
                piles[left] - calculateMaxScoreDifference(left + 1, right);

            // Choose right pile
            const chooseRight =
                piles[right] - calculateMaxScoreDifference(left, right - 1);

            // Store the maximum score difference
            memo[left][right] = Math.max(chooseLeft, chooseRight);
        }

        return memo[left][right];
    }

    // First player wins if their score difference is positive
    return calculateMaxScoreDifference(0, pileCount - 1) > 0;
}