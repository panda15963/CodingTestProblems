/**
 * Determines if the first player can win the stone game
 * @param piles - Array of stone piles where each element represents the number of stones in that pile
 * @returns true if the first player can win, false otherwise
 */
function stoneGame(piles: number[]): boolean {
    const pileCount: number = piles.length;
  
    // Memoization table to store computed results
    // memo[i][j] represents the maximum score difference the current player can achieve
    // when choosing from piles[i] to piles[j]
    const memo: number[][] = new Array(pileCount)
        .fill(0)
        .map(() => new Array(pileCount).fill(0));
  
    /**
     * Recursively calculates the maximum score difference for the current player
     * @param left - Left boundary index of available piles
     * @param right - Right boundary index of available piles
     * @returns Maximum score difference the current player can achieve
     */
    const calculateMaxScoreDifference = (left: number, right: number): number => {
        // Base case: no piles left to choose from
        if (left > right) {
            return 0;
        }
      
        // Check if result is already computed (memoization)
        if (memo[left][right] === 0) {
            // Choose left pile: gain piles[left] stones, 
            // then subtract opponent's best score from remaining piles
            const chooseLeft: number = piles[left] - calculateMaxScoreDifference(left + 1, right);
          
            // Choose right pile: gain piles[right] stones,
            // then subtract opponent's best score from remaining piles
            const chooseRight: number = piles[right] - calculateMaxScoreDifference(left, right - 1);
          
            // Store the maximum score difference in memo table
            memo[left][right] = Math.max(chooseLeft, chooseRight);
        }
      
        return memo[left][right];
    };
  
    // First player wins if their score difference is positive
    return calculateMaxScoreDifference(0, pileCount - 1) > 0;
}