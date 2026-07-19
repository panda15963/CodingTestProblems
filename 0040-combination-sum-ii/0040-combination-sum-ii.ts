/**
 * Find all unique combinations in candidates where the candidate numbers sum to target.
 * Each number in candidates may only be used once in the combination.
 * @param candidates - Array of candidate numbers
 * @param target - Target sum to achieve
 * @returns Array of all unique combinations that sum to target
 */
function combinationSum2(candidates: number[], target: number): number[][] {
    // Sort candidates in ascending order for optimization and duplicate handling
    candidates.sort((a, b) => a - b);
  
    // Store all valid combinations
    const result: number[][] = [];
  
    // Current combination being built
    const currentCombination: number[] = [];
  
    /**
     * Depth-first search to explore all possible combinations
     * @param startIndex - Current index in candidates array to start searching from
     * @param remainingSum - Remaining sum needed to reach target
     */
    const backtrack = (startIndex: number, remainingSum: number): void => {
        // Base case: found a valid combination
        if (remainingSum === 0) {
            result.push([...currentCombination]);
            return;
        }
      
        // Pruning: stop if we've exhausted candidates or remaining sum is too small
        if (startIndex >= candidates.length || remainingSum < candidates[startIndex]) {
            return;
        }
      
        // Try each candidate starting from startIndex
        for (let currentIndex = startIndex; currentIndex < candidates.length; currentIndex++) {
            // Skip duplicates to avoid duplicate combinations
            // Only skip if it's not the first element in this recursion level
            if (currentIndex > startIndex && candidates[currentIndex] === candidates[currentIndex - 1]) {
                continue;
            }
          
            // Include current candidate in the combination
            currentCombination.push(candidates[currentIndex]);
          
            // Recursively search with updated parameters
            // Move to next index since each element can only be used once
            backtrack(currentIndex + 1, remainingSum - candidates[currentIndex]);
          
            // Backtrack: remove the current candidate to try other possibilities
            currentCombination.pop();
        }
    };
  
    // Start the search from index 0 with the full target sum
    backtrack(0, target);
  
    return result;
}