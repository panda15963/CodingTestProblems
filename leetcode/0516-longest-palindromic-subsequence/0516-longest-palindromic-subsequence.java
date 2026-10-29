class Solution {
    public int longestPalindromeSubseq(String s) {
        int length = s.length();
      
        // dp[i][j] represents the length of longest palindromic subsequence 
        // in substring s[i...j]
        int[][] dp = new int[length][length];
      
        // Base case: single character is a palindrome of length 1
        for (int i = 0; i < length; i++) {
            dp[i][i] = 1;
        }
      
        // Fill the dp table by increasing substring length
        // Start from the end and move backwards for the left boundary
        for (int left = length - 1; left >= 0; left--) {
            // Right boundary starts from left + 1 to ensure valid substring
            for (int right = left + 1; right < length; right++) {
                // If characters at both ends match, add 2 to the result of inner substring
                if (s.charAt(left) == s.charAt(right)) {
                    dp[left][right] = dp[left + 1][right - 1] + 2;
                } else {
                    // If characters don't match, take maximum of:
                    // 1. Exclude left character: dp[left + 1][right]
                    // 2. Exclude right character: dp[left][right - 1]
                    dp[left][right] = Math.max(dp[left + 1][right], dp[left][right - 1]);
                }
            }
        }
      
        // Return the longest palindromic subsequence for the entire string
        return dp[0][length - 1];
    }
}
