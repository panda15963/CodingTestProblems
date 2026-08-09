/**
 * Stone Game II - Dynamic Programming with Memoization
 * Alice and Bob play a game with piles of stones. Players take turns, with Alice starting first.
 * On each turn, a player can take X piles where 1 <= X <= 2M (M is initially 1).
 * After taking X piles, M becomes max(M, X) for the next player.
 * The goal is to maximize the number of stones Alice can get.
 * 
 * @param piles - Array of integers representing the number of stones in each pile
 * @returns The maximum number of stones Alice can get
 */
function stoneGameII(piles: number[]): number {
    const numPiles: number = piles.length;
  
    // Memoization table: memo[i][m] stores the maximum stones the current player can get
    // starting from pile i with M = m
    const memo: number[][] = Array.from(
        { length: numPiles }, 
        () => new Array(numPiles + 1).fill(0)
    );
  
    // Prefix sum array for quick calculation of sum of stones from index i to end
    // prefixSum[i] = sum of piles[0] to piles[i-1]
    const prefixSum: number[] = new Array(numPiles + 1).fill(0);
    for (let i = 0; i < numPiles; i++) {
        prefixSum[i + 1] = prefixSum[i] + piles[i];
    }
  
    /**
     * DFS with memoization to find the maximum stones the current player can get
     * 
     * @param startIndex - The starting pile index for the current turn
     * @param currentM - The current value of M (maximum piles constraint parameter)
     * @returns Maximum stones the current player can get from this state
     */
    const dfs = (startIndex: number, currentM: number): number => {
        // If we can take all remaining piles (2M >= remaining piles), take them all
        if (currentM * 2 >= numPiles - startIndex) {
            return prefixSum[numPiles] - prefixSum[startIndex];
        }
      
        // Return memoized result if already computed
        if (memo[startIndex][currentM]) {
            return memo[startIndex][currentM];
        }
      
        let maxStones: number = 0;
      
        // Try taking x piles where x ranges from 1 to 2M
        for (let x = 1; x <= currentM * 2; x++) {
            // Calculate maximum stones by considering:
            // Total remaining stones - stones the opponent will get optimally
            const totalRemaining: number = prefixSum[numPiles] - prefixSum[startIndex];
            const opponentStones: number = dfs(startIndex + x, Math.max(currentM, x));
            maxStones = Math.max(maxStones, totalRemaining - opponentStones);
        }
      
        // Memoize and return the result
        memo[startIndex][currentM] = maxStones;
        return maxStones;
    };
  
    // Start the game with Alice at pile 0 with M = 1
    return dfs(0, 1);
}