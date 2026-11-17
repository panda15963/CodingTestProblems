class Solution {
    public int minimumChanges(String s, int k) {
        int stringLength = s.length();
      
        // minChanges[i][j] = minimum changes needed to make substring from index i to j semi-palindromic
        int[][] minChanges = new int[stringLength + 1][stringLength + 1];
      
        // dp[i][j] = minimum changes needed to partition first i characters into j semi-palindromic parts
        int[][] dp = new int[stringLength + 1][k + 1];
      
        final int INFINITY = 1 << 30;
      
        // Initialize arrays with infinity (representing impossible states)
        for (int i = 0; i <= stringLength; ++i) {
            Arrays.fill(minChanges[i], INFINITY);
            Arrays.fill(dp[i], INFINITY);
        }
      
        // Precompute minimum changes for all substrings to become semi-palindromic
        for (int startIdx = 1; startIdx <= stringLength; ++startIdx) {
            for (int endIdx = startIdx; endIdx <= stringLength; ++endIdx) {
                int substringLength = endIdx - startIdx + 1;
              
                // Try all possible divisors of substring length (for semi-palindrome patterns)
                for (int divisor = 1; divisor < substringLength; ++divisor) {
                    if (substringLength % divisor == 0) {
                        int changesNeeded = 0;
                      
                        // Check pairs of characters that should match in semi-palindrome pattern
                        for (int leftPos = 0; leftPos < substringLength; ++leftPos) {
                            // Calculate corresponding right position based on divisor pattern
                            int rightPos = (substringLength / divisor - 1 - leftPos / divisor) * divisor + leftPos % divisor;
                          
                            // Only check each pair once (avoid double counting)
                            if (leftPos >= rightPos) {
                                break;
                            }
                          
                            // Count mismatches that need to be changed
                            if (s.charAt(startIdx - 1 + leftPos) != s.charAt(startIdx - 1 + rightPos)) {
                                ++changesNeeded;
                            }
                        }
                      
                        // Update minimum changes for this substring
                        minChanges[startIdx][endIdx] = Math.min(minChanges[startIdx][endIdx], changesNeeded);
                    }
                }
            }
        }
      
        // Base case: 0 characters partitioned into 0 parts requires 0 changes
        dp[0][0] = 0;
      
        // Dynamic programming to find minimum changes for partitioning
        for (int charCount = 1; charCount <= stringLength; ++charCount) {
            for (int partCount = 1; partCount <= k; ++partCount) {
                // Try all possible positions for the last partition
                for (int prevPartitionEnd = 0; prevPartitionEnd < charCount - 1; ++prevPartitionEnd) {
                    // Current partition: from prevPartitionEnd+1 to charCount
                    dp[charCount][partCount] = Math.min(
                        dp[charCount][partCount], 
                        dp[prevPartitionEnd][partCount - 1] + minChanges[prevPartitionEnd + 1][charCount]
                    );
                }
            }
        }
      
        // Return minimum changes to partition entire string into k parts
        return dp[stringLength][k];
    }
}
