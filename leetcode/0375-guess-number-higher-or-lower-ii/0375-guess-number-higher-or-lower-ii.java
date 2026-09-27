class Solution {
    public int getMoneyAmount(int n) {
        // dp[i][j] represents the minimum amount of money needed to guarantee a win
        // when guessing a number between i and j (inclusive)
        int[][] dp = new int[n + 1][n + 1];
      
        // Iterate through all possible ranges, starting from smaller ranges to larger ones
        // i represents the start of the range (moving from n-1 down to 1)
        for (int start = n - 1; start > 0; --start) {
            // j represents the end of the range (moving from start+1 to n)
            for (int end = start + 1; end <= n; ++end) {
                // Initialize with the worst case: guessing the rightmost number (end)
                // If we guess end and it's wrong, we only need to check [start, end-1]
                dp[start][end] = end + dp[start][end - 1];
              
                // Try all possible guesses k between start and end-1
                // to find the minimum guaranteed cost
                for (int guess = start; guess < end; ++guess) {
                    // Cost for guessing k:
                    // - We pay k for the guess
                    // - If k is too small, we search in [guess+1, end]
                    // - If k is too large, we search in [start, guess-1]
                    // - We take the max of both sides (worst case scenario)
                    int costForThisGuess = guess + Math.max(dp[start][guess - 1], dp[guess + 1][end]);
                  
                    // Update the minimum cost for range [start, end]
                    dp[start][end] = Math.min(dp[start][end], costForThisGuess);
                }
            }
        }
      
        // Return the minimum amount needed to guarantee a win for the range [1, n]
        return dp[1][n];
    }
}
