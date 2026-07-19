/**
 * Finds all unique combinations in candidates where the numbers sum to target.
 * Each number in candidates may be used unlimited times in the combination.
 * @param candidates - Array of distinct positive integers
 * @param target - Target sum to achieve
 * @returns Array of arrays containing all unique combinations that sum to target
 */
function combinationSum(candidates: number[], target: number): number[][] {
    // Sort candidates in ascending order for optimization
    candidates.sort((a: number, b: number) => a - b);
  
    // Store all valid combinations
    const result: number[][] = [];
  
    // Current combination being built
    const currentCombination: number[] = [];
  
    /**
     * Depth-first search to explore all possible combinations
     * @param startIndex - Starting index in candidates array to avoid duplicates
     * @param remainingSum - Remaining sum needed to reach target
     */
    const depthFirstSearch = (startIndex: number, remainingSum: number): void => {
        // Base case: found a valid combination
        if (remainingSum === 0) {
            // Add a copy of current combination to results
            result.push([...currentCombination]);
            return;
        }
      
        // Pruning: if remaining sum is less than smallest available candidate
        if (remainingSum < candidates[startIndex]) {
            return;
        }
      
        // Try each candidate starting from startIndex
        for (let index: number = startIndex; index < candidates.length; index++) {
            // Add current candidate to combination
            currentCombination.push(candidates[index]);
          
            // Recursively search with same index (allowing reuse) and reduced sum
            depthFirstSearch(index, remainingSum - candidates[index]);
          
            // Backtrack: remove the last added candidate
            currentCombination.pop();
        }
    };
  
    // Start the search from index 0 with full target sum
    depthFirstSearch(0, target);
  
    return result;
}