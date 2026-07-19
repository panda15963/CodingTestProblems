/**
 * Find all unique combinations in candidates where the candidate numbers sum to target.
 * Each number in candidates may only be used once.
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    // Sort candidates for pruning and duplicate handling
    candidates.sort((a, b) => a - b);

    // Store all valid combinations
    const result = [];

    // Current combination
    const currentCombination = [];

    /**
     * Backtracking search
     *
     * @param {number} startIndex
     * @param {number} remainingSum
     */
    const backtrack = (startIndex, remainingSum) => {
        // Found a valid combination
        if (remainingSum === 0) {
            result.push([...currentCombination]);
            return;
        }

        // Pruning
        if (
            startIndex >= candidates.length ||
            remainingSum < candidates[startIndex]
        ) {
            return;
        }

        // Try each candidate
        for (
            let currentIndex = startIndex;
            currentIndex < candidates.length;
            currentIndex++
        ) {
            // Skip duplicates
            if (
                currentIndex > startIndex &&
                candidates[currentIndex] === candidates[currentIndex - 1]
            ) {
                continue;
            }

            // Choose current candidate
            currentCombination.push(candidates[currentIndex]);

            // Each element can only be used once
            backtrack(
                currentIndex + 1,
                remainingSum - candidates[currentIndex]
            );

            // Backtrack
            currentCombination.pop();
        }
    };

    // Start search
    backtrack(0, target);

    return result;
};