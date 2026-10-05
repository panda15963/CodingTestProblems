/**
 * Determines if a frog can cross a river by jumping on stones
 * @param stones - Array of stone positions in ascending order
 * @returns true if the frog can reach the last stone, false otherwise
 */
function canCross(stones: number[]): boolean {
    const stoneCount: number = stones.length;
  
    // Map to store stone position to its index for O(1) lookup
    const positionToIndex: Map<number, number> = new Map();
    for (let i = 0; i < stoneCount; i++) {
        positionToIndex.set(stones[i], i);
    }
  
    // Memoization table: memo[stoneIndex][lastJumpDistance] 
    // -1: not computed, 0: cannot reach end, 1: can reach end
    const memo: number[][] = Array.from(
        { length: stoneCount }, 
        () => new Array(stoneCount).fill(-1)
    );
  
    /**
     * DFS helper function to check if frog can reach the last stone
     * @param currentIndex - Current stone index
     * @param lastJumpDistance - Distance of the last jump
     * @returns true if can reach the last stone from current position
     */
    const depthFirstSearch = (currentIndex: number, lastJumpDistance: number): boolean => {
        // Base case: reached the last stone
        if (currentIndex === stoneCount - 1) {
            return true;
        }
      
        // Check memoization table
        if (memo[currentIndex][lastJumpDistance] !== -1) {
            return memo[currentIndex][lastJumpDistance] === 1;
        }
      
        // Try jumps of distance k-1, k, or k+1 units
        for (let nextJumpDistance = lastJumpDistance - 1; nextJumpDistance <= lastJumpDistance + 1; nextJumpDistance++) {
            // Jump distance must be positive
            if (nextJumpDistance > 0) {
                const targetPosition: number = stones[currentIndex] + nextJumpDistance;
              
                // Check if there's a stone at the target position
                if (positionToIndex.has(targetPosition)) {
                    const targetIndex: number = positionToIndex.get(targetPosition)!;
                  
                    // Recursively check if we can reach the end from the target stone
                    if (depthFirstSearch(targetIndex, nextJumpDistance)) {
                        memo[currentIndex][lastJumpDistance] = 1;
                        return true;
                    }
                }
            }
        }
      
        // Cannot reach the end from current position with given last jump
        memo[currentIndex][lastJumpDistance] = 0;
        return false;
    };
  
    // Start from first stone (index 0) with initial jump distance 0
    return depthFirstSearch(0, 0);
}
