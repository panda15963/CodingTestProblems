/**
 * Determines if the first player can guarantee a win in the "100 game"
 * @param maxChoosableInteger - The maximum integer that can be chosen (1 to maxChoosableInteger)
 * @param desiredTotal - The target sum to reach or exceed to win
 * @returns true if the first player can force a win, false otherwise
 */
function canIWin(maxChoosableInteger: number, desiredTotal: number): boolean {
    // Check if the sum of all possible integers is less than the desired total
    // If so, neither player can win
    const sumOfAllIntegers = ((1 + maxChoosableInteger) * maxChoosableInteger) / 2;
    if (sumOfAllIntegers < desiredTotal) {
        return false;
    }
  
    // Memoization cache to store computed game states
    // Key: bitmask representing used numbers, Value: whether current player can win
    const memoCache: Record<number, boolean> = {};
  
    /**
     * Recursive function to determine if the current player can win
     * @param usedNumbersMask - Bitmask representing which numbers have been used
     * @param currentSum - Current sum of all chosen numbers
     * @returns true if the current player can guarantee a win from this state
     */
    const canCurrentPlayerWin = (usedNumbersMask: number, currentSum: number): boolean => {
        // Check if this game state has already been computed
        if (memoCache.hasOwnProperty(usedNumbersMask)) {
            return memoCache[usedNumbersMask];
        }
      
        // Try each possible number from 1 to maxChoosableInteger
        for (let number = 1; number <= maxChoosableInteger; number++) {
            // Check if this number hasn't been used yet
            // (bit at position 'number' should be 0)
            const isNumberAvailable = ((usedNumbersMask >> number) & 1) === 0;
          
            if (isNumberAvailable) {
                // Mark this number as used by setting its bit to 1
                const newMask = usedNumbersMask | (1 << number);
                const newSum = currentSum + number;
              
                // Current player wins if:
                // 1. Choosing this number reaches or exceeds the desired total, OR
                // 2. After choosing this number, the opponent cannot win
                if (newSum >= desiredTotal || !canCurrentPlayerWin(newMask, newSum)) {
                    memoCache[usedNumbersMask] = true;
                    return true;
                }
            }
        }
      
        // If no winning move is found, current player loses
        memoCache[usedNumbersMask] = false;
        return false;
    };
  
    // Start the game with no numbers used (mask = 0) and sum = 0
    return canCurrentPlayerWin(0, 0);
}
