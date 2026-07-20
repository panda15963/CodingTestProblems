class Solution {
    // Memoization table to store results of subproblems
    // dp[i][j] represents if s[i:] matches p[j:]
    private Boolean[][] dp;
  
    // Character arrays for the input string and pattern
    private char[] sChars;
    private char[] pChars;
  
    // Lengths of the input string and pattern
    private int sLength;
    private int pLength;

    /**
     * Determines if the string matches the given wildcard pattern.
     * '?' matches any single character
     * '*' matches any sequence of characters (including empty sequence)
     * 
     * @param s the input string to match
     * @param p the wildcard pattern
     * @return true if the string matches the pattern, false otherwise
     */
    public boolean isMatch(String s, String p) {
        // Convert strings to character arrays for easier access
        this.sChars = s.toCharArray();
        this.pChars = p.toCharArray();
      
        // Store lengths
        this.sLength = s.length();
        this.pLength = p.length();
      
        // Initialize memoization table
        this.dp = new Boolean[sLength][pLength];
      
        // Start DFS from the beginning of both strings
        return dfs(0, 0);
    }

    /**
     * Recursive DFS function with memoization to check pattern matching.
     * 
     * @param sIndex current index in the string
     * @param pIndex current index in the pattern
     * @return true if s[sIndex:] matches p[pIndex:], false otherwise
     */
    private boolean dfs(int sIndex, int pIndex) {
        // Base case: reached end of string
        if (sIndex >= sLength) {
            // Check if we've also reached end of pattern
            // or if remaining pattern is '*' which can match empty string
            return pIndex >= pLength || (pChars[pIndex] == '*' && dfs(sIndex, pIndex + 1));
        }
      
        // Base case: reached end of pattern but not end of string
        if (pIndex >= pLength) {
            return false;
        }
      
        // Check memoization table to avoid redundant computation
        if (dp[sIndex][pIndex] != null) {
            return dp[sIndex][pIndex];
        }
      
        // Handle wildcard '*' - can match zero or more characters
        if (pChars[pIndex] == '*') {
            // Three choices:
            // 1. Match one or more characters: move string pointer (sIndex + 1, pIndex)
            // 2. Match exactly one character: move both pointers (sIndex + 1, pIndex + 1)
            // 3. Match zero characters: skip the '*' (sIndex, pIndex + 1)
            dp[sIndex][pIndex] = dfs(sIndex + 1, pIndex) || 
                                 dfs(sIndex + 1, pIndex + 1) || 
                                 dfs(sIndex, pIndex + 1);
        } else {
            // Handle regular character or '?'
            // Character must match (or pattern has '?'), then check remaining strings
            dp[sIndex][pIndex] = (pChars[pIndex] == '?' || sChars[sIndex] == pChars[pIndex]) && 
                                 dfs(sIndex + 1, pIndex + 1);
        }
      
        // Return and store the result
        return dp[sIndex][pIndex];
    }
}