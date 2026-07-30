class Solution {
    // Memoization cache: dp[i][j][length] represents whether s1[i...i+length-1] 
    // can be scrambled to match s2[j...j+length-1]
    private Boolean[][][] dp;
    private String s1;
    private String s2;

    /**
     * Determines if s2 is a scrambled string of s1.
     * A scrambled string is formed by recursively dividing the string into two non-empty
     * substrings and potentially swapping them.
     * 
     * @param s1 The original string
     * @param s2 The string to check if it's a scrambled version of s1
     * @return true if s2 is a scrambled string of s1, false otherwise
     */
    public boolean isScramble(String s1, String s2) {
        int n = s1.length();
        this.s1 = s1;
        this.s2 = s2;
      
        // Initialize memoization cache
        // dp[i][j][length]: can substring of s1 starting at i with given length
        // be scrambled to match substring of s2 starting at j with same length
        dp = new Boolean[n][n][n + 1];
      
        // Check if entire strings can be scrambled to match
        return checkScramble(0, 0, n);
    }

    /**
     * Recursively checks if a substring of s1 can be scrambled to match a substring of s2.
     * 
     * @param s1Start Starting index in s1
     * @param s2Start Starting index in s2
     * @param length Length of the substrings to compare
     * @return true if the substrings can be scrambled to match, false otherwise
     */
    private boolean checkScramble(int s1Start, int s2Start, int length) {
        // Return cached result if already computed
        if (dp[s1Start][s2Start][length] != null) {
            return dp[s1Start][s2Start][length];
        }
      
        // Base case: single character comparison
        if (length == 1) {
            return s1.charAt(s1Start) == s2.charAt(s2Start);
        }
      
        // Try all possible split points
        for (int splitSize = 1; splitSize < length; splitSize++) {
            // Case 1: No swap - left matches left, right matches right
            // Check if s1[s1Start...s1Start+splitSize-1] matches s2[s2Start...s2Start+splitSize-1]
            // AND s1[s1Start+splitSize...s1Start+length-1] matches s2[s2Start+splitSize...s2Start+length-1]
            if (checkScramble(s1Start, s2Start, splitSize) && 
                checkScramble(s1Start + splitSize, s2Start + splitSize, length - splitSize)) {
                return dp[s1Start][s2Start][length] = true;
            }
          
            // Case 2: With swap - left matches right, right matches left
            // Check if s1[s1Start+splitSize...s1Start+length-1] matches s2[s2Start...s2Start+(length-splitSize)-1]
            // AND s1[s1Start...s1Start+splitSize-1] matches s2[s2Start+length-splitSize...s2Start+length-1]
            if (checkScramble(s1Start + splitSize, s2Start, length - splitSize) && 
                checkScramble(s1Start, s2Start + length - splitSize, splitSize)) {
                return dp[s1Start][s2Start][length] = true;
            }
        }
      
        // No valid split found
        return dp[s1Start][s2Start][length] = false;
    }
}
