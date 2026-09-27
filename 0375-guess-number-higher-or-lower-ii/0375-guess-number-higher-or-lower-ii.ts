/**
 * Calculates the minimum amount of money needed to guarantee a win in a guessing game.
 * In this game, you guess a number between 1 and n, and pay the guessed number if wrong.
 * The goal is to minimize the maximum possible loss.
 * 
 * @param n - The upper bound of the guessing range (1 to n)
 * @returns The minimum amount of money needed to guarantee a win
 */
function getMoneyAmount(n: number): number {
    // Create a 2D DP table where dp[i][j] represents the minimum cost 
    // to guarantee a win when guessing between i and j
    const dp: number[][] = Array.from(
        { length: n + 1 }, 
        () => Array(n + 1).fill(0)
    );
  
    // Build the DP table from smaller ranges to larger ranges
    // Start from the second last number and work backwards
    for (let rangeStart = n - 1; rangeStart >= 1; rangeStart--) {
        // For each starting position, consider all possible ending positions
        for (let rangeEnd = rangeStart + 1; rangeEnd <= n; rangeEnd++) {
            // Initialize with the worst case: guessing the largest number in range
            dp[rangeStart][rangeEnd] = rangeEnd + dp[rangeStart][rangeEnd - 1];
          
            // Try each possible guess k within the current range
            for (let guess = rangeStart; guess < rangeEnd; guess++) {
                // For each guess, calculate the cost:
                // - Pay the guessed number (guess)
                // - Plus the maximum cost of the two possible subranges
                //   (we prepare for the worst case scenario)
                const currentCost = guess + Math.max(
                    dp[rangeStart][guess - 1],  // Cost if actual number is less than guess
                    dp[guess + 1][rangeEnd]      // Cost if actual number is greater than guess
                );
              
                // Keep track of the minimum cost among all possible guesses
                dp[rangeStart][rangeEnd] = Math.min(
                    dp[rangeStart][rangeEnd], 
                    currentCost
                );
            }
        }
    }
  
    // Return the minimum cost to guarantee a win for the full range [1, n]
    return dp[1][n];
}
