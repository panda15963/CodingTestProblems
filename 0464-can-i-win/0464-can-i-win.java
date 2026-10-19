class Solution {
    // Memoization cache: maps game state (bitmask) to whether current player can win
    private Map<Integer, Boolean> memo = new HashMap<>();
    private int maxNumber;
    private int targetSum;
  
    /**
     * Determines if the first player can guarantee a win in the game.
     * Players take turns choosing numbers from 1 to maxChoosableInteger (without replacement).
     * The first player to reach or exceed desiredTotal wins.
     * 
     * @param maxChoosableInteger The maximum number that can be chosen (inclusive)
     * @param desiredTotal The target sum to reach or exceed to win
     * @return true if the first player can force a win, false otherwise
     */
    public boolean canIWin(int maxChoosableInteger, int desiredTotal) {
        // Check if the sum of all available numbers is less than desired total
        // If so, neither player can win
        int totalSum = (1 + maxChoosableInteger) * maxChoosableInteger / 2;
        if (totalSum < desiredTotal) {
            return false;
        }
      
        // Initialize instance variables for use in DFS
        this.maxNumber = maxChoosableInteger;
        this.targetSum = desiredTotal;
      
        // Start DFS with empty bitmask (no numbers chosen) and current sum of 0
        return dfs(0, 0);
    }
  
    /**
     * Recursive DFS with memoization to determine if current player can win.
     * Uses bitmask to track which numbers have been chosen.
     * 
     * @param usedMask Bitmask representing which numbers have been used (bit i = 1 means number i+1 is used)
     * @param currentSum The current running sum of all chosen numbers
     * @return true if the current player can force a win from this state
     */
    private boolean dfs(int usedMask, int currentSum) {
        // Check if we've already computed this game state
        if (memo.containsKey(usedMask)) {
            return memo.get(usedMask);
        }
      
        // Try each available number from 1 to maxNumber
        for (int i = 0; i < maxNumber; i++) {
            // Check if number (i+1) has not been used yet
            if ((usedMask >> i & 1) == 0) {
                int chosenNumber = i + 1;
              
                // Current player wins if:
                // 1. Choosing this number reaches/exceeds the target, OR
                // 2. After choosing this number, the opponent cannot win
                if (currentSum + chosenNumber >= targetSum || 
                    !dfs(usedMask | (1 << i), currentSum + chosenNumber)) {
                  
                    // Current player can win from this state
                    memo.put(usedMask, true);
                    return true;
                }
            }
        }
      
        // No winning move found for current player from this state
        memo.put(usedMask, false);
        return false;
    }
}
