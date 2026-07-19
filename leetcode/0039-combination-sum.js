/**
 * Finds all unique combinations in candidates where the numbers sum to target.
 * Each number in candidates may be used unlimited times.
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    // Sort candidates in ascending order for optimization
    candidates.sort((a, b) => a - b);

    // Store all valid combinations
    const result = [];

    // Current combination being built
    const currentCombination = [];

    /**
     * Depth-first search to explore all possible combinations
     *
     * @param {number} startIndex
     * @param {number} remainingSum
     */
    const depthFirstSearch = (startIndex, remainingSum) => {
        // Base case: found a valid combination
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

        // Try each candidate starting from startIndex
        for (let index = startIndex; index < candidates.length; index++) {
            currentCombination.push(candidates[index]);

            // Reuse the same candidate
            depthFirstSearch(
                index,
                remainingSum - candidates[index]
            );

            // Backtrack
            currentCombination.pop();
        }
    };

    // Start DFS
    depthFirstSearch(0, target);

    return result;
};