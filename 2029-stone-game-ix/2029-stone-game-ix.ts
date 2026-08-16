/**
 * Determines if Alice can win the Stone Game IX
 * @param stones - Array of stone values
 * @returns true if Alice wins, false otherwise
 */
function stoneGameIX(stones: number[]): boolean {
    // Count stones by their modulo 3 values
    const countByModThree: number[] = Array(3).fill(0);
    for (const stone of stones) {
        countByModThree[stone % 3]++;
    }
  
    // Create alternative count array with swapped positions for mod 1 and mod 2
    const alternativeCount: number[] = [
        countByModThree[0], 
        countByModThree[2], 
        countByModThree[1]
    ];
  
    /**
     * Checks if Alice can win with given stone count configuration
     * @param stoneCount - Array containing counts of stones with mod values [0, 1, 2]
     * @returns true if Alice wins with this configuration
     */
    const checkWinCondition = (stoneCount: number[]): boolean => {
        // Alice must start with a stone of mod 1
        stoneCount[1]--;
        if (stoneCount[1] < 0) {
            return false;
        }
      
        // Calculate total rounds played
        // Start with 1 (Alice's first move) + pairs of mod 1 and mod 2 + remaining mod 0 stones
        let totalRounds: number = 1 + Math.min(stoneCount[1], stoneCount[2]) * 2 + stoneCount[0];
      
        // If there are more mod 1 stones than mod 2, Alice takes one more
        if (stoneCount[1] > stoneCount[2]) {
            stoneCount[1]--;
            totalRounds++;
        }
      
        // Alice wins if total rounds is odd and there's an imbalance between mod 1 and mod 2
        return totalRounds % 2 === 1 && stoneCount[1] !== stoneCount[2];
    };
  
    // Check both starting strategies: starting with mod 1 or effectively starting with mod 2
    return checkWinCondition([...countByModThree]) || checkWinCondition([...alternativeCount]);
}