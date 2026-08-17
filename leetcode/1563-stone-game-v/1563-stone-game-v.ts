/**
 * Solves the Stone Game V problem using dynamic programming with memoization.
 * The goal is to find the maximum score Alice can obtain by splitting stones optimally.
 * 
 * @param stoneValue - Array of stone values
 * @returns Maximum score Alice can obtain
 */
function stoneGameV(stoneValue: number[]): number {
    const n: number = stoneValue.length;
  
    // Prefix sum array for quick range sum calculation
    // prefixSum[i] represents sum of stones from index 0 to i-1
    const prefixSum: number[] = Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
    }
  
    // Memoization table for dynamic programming
    // memo[i][j] stores the maximum score for subarray from index i to j
    const memo: number[][] = Array.from({ length: n }, () => Array(n).fill(-1));

    /**
     * Recursive function with memoization to find maximum score for a range.
     * 
     * @param left - Starting index of the range (inclusive)
     * @param right - Ending index of the range (inclusive)
     * @returns Maximum score obtainable from the given range
     */
    const dfs = (left: number, right: number): number => {
        // Base case: single stone or invalid range
        if (left >= right) {
            return 0;
        }
      
        // Check if result is already computed
        if (memo[left][right] !== -1) {
            return memo[left][right];
        }
      
        let maxScore: number = 0;
        let leftSum: number = 0;
        let rightSum: number = prefixSum[right + 1] - prefixSum[left];
      
        // Try all possible split positions
        for (let splitPos = left; splitPos < right; splitPos++) {
            leftSum += stoneValue[splitPos];
            rightSum -= stoneValue[splitPos];
          
            if (leftSum < rightSum) {
                // Left part is smaller, Alice takes left and continues with left range
                // Pruning: skip if current max score is already greater than twice the left sum
                if (maxScore > leftSum * 2) {
                    continue;
                }
                maxScore = Math.max(maxScore, leftSum + dfs(left, splitPos));
            } else if (leftSum > rightSum) {
                // Right part is smaller, Alice takes right and continues with right range
                // Pruning: break early if current max score is already greater than twice the right sum
                if (maxScore > rightSum * 2) {
                    break;
                }
                maxScore = Math.max(maxScore, rightSum + dfs(splitPos + 1, right));
            } else {
                // Both parts are equal, Alice can choose either
                maxScore = Math.max(
                    maxScore, 
                    leftSum + dfs(left, splitPos), 
                    rightSum + dfs(splitPos + 1, right)
                );
            }
        }
      
        // Store and return the computed result
        memo[left][right] = maxScore;
        return maxScore;
    };

    // Start the recursive computation for the entire array
    return dfs(0, n - 1);
}
