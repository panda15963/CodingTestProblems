class Solution {
    /**
     * Calculates the minimum number of steps required to make two strings the same
     * by deleting characters from either string.
     * 
     * @param word1 The first string
     * @param word2 The second string
     * @return The minimum number of deletion operations needed
     */
    public int minDistance(String word1, String word2) {
        int lengthWord1 = word1.length();
        int lengthWord2 = word2.length();
      
        // dp[i][j] represents the minimum deletions needed to make 
        // the first i characters of word1 equal to the first j characters of word2
        int[][] dp = new int[lengthWord1 + 1][lengthWord2 + 1];
      
        // Initialize base case: to make word1[0...i-1] equal to empty string,
        // we need to delete all i characters
        for (int i = 0; i <= lengthWord1; i++) {
            dp[i][0] = i;
        }
      
        // Initialize base case: to make empty string equal to word2[0...j-1],
        // we need to delete all j characters from word2
        for (int j = 0; j <= lengthWord2; j++) {
            dp[0][j] = j;
        }
      
        // Fill the dp table using dynamic programming
        for (int i = 1; i <= lengthWord1; i++) {
            for (int j = 1; j <= lengthWord2; j++) {
                // Get current characters from both strings (0-indexed)
                char charFromWord1 = word1.charAt(i - 1);
                char charFromWord2 = word2.charAt(j - 1);
              
                if (charFromWord1 == charFromWord2) {
                    // If characters match, no deletion needed
                    // Take the result from previous state
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    // If characters don't match, we need to delete one character
                    // Either delete from word1 (dp[i-1][j]) or from word2 (dp[i][j-1])
                    // Choose the option with minimum deletions and add 1
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + 1;
                }
            }
        }
      
        // Return the minimum deletions needed for the entire strings
        return dp[lengthWord1][lengthWord2];
    }
}
