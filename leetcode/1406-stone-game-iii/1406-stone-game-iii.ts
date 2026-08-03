/**
 * Determines the winner of Stone Game III using dynamic programming with memoization.
 * Alice and Bob take turns removing stones, Alice goes first.
 * Each player can take 1, 2, or 3 stones from the beginning of the array.
 * The player with the highest total stone value wins.
 * 
 * @param stoneValue - Array of stone values
 * @returns "Alice" if Alice wins, "Bob" if Bob wins, or "Tie" if it's a draw
 */
function stoneGameIII(stoneValue: number[]): string {
    const n: number = stoneValue.length;
    const INFINITY: number = 1 << 30; // Large value representing uncomputed state
  
    // Memoization array to store the maximum score difference the current player can achieve
    // starting from index i
    const memo: number[] = new Array(n).fill(INFINITY);
  
    /**
     * Recursive function with memoization to calculate the maximum score difference
     * the current player can achieve starting from index i.
     * 
     * @param index - Current position in the stone array
     * @returns Maximum score difference the current player can achieve
     */
    const calculateMaxScoreDifference = (index: number): number => {
        // Base case: no stones left to take
        if (index >= n) {
            return 0;
        }
      
        // Return memoized result if already computed
        if (memo[index] !== INFINITY) {
            return memo[index];
        }
      
        let maxScoreDifference: number = -INFINITY;
        let currentSum: number = 0;
      
        // Try taking 1, 2, or 3 stones
        for (let stonesCount: number = 0; stonesCount < 3 && index + stonesCount < n; stonesCount++) {
            // Add current stone to the sum
            currentSum += stoneValue[index + stonesCount];
          
            // Calculate score difference: current player's gain minus opponent's best outcome
            // from the remaining stones
            const scoreDifference: number = currentSum - calculateMaxScoreDifference(index + stonesCount + 1);
            maxScoreDifference = Math.max(maxScoreDifference, scoreDifference);
        }
      
        // Store and return the result
        memo[index] = maxScoreDifference;
        return maxScoreDifference;
    };
  
    // Calculate the final score difference from Alice's perspective
    const aliceScoreDifference: number = calculateMaxScoreDifference(0);
  
    // Determine the winner based on the score difference
    if (aliceScoreDifference === 0) {
        return 'Tie';
    }
    return aliceScoreDifference > 0 ? 'Alice' : 'Bob';
}