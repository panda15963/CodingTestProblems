class Solution {
    public int maxEnvelopes(int[][] envelopes) {
        // Sort envelopes by width ascending, if width is same then by height descending
        // This ensures we don't count multiple envelopes with same width
        Arrays.sort(envelopes, (a, b) -> {
            if (a[0] == b[0]) {
                return b[1] - a[1];  // Same width: sort by height descending
            }
            return a[0] - b[0];  // Different width: sort by width ascending
        });
      
        int n = envelopes.length;
      
        // dp array to store the smallest tail height for each subsequence length
        // dp[i] represents the smallest ending height of all increasing subsequences of length i
        int[] dp = new int[n + 1];
        dp[1] = envelopes[0][1];  // Initialize with first envelope's height
        int maxLength = 1;  // Current maximum length of increasing subsequence
      
        // Process remaining envelopes
        for (int i = 1; i < n; i++) {
            int currentHeight = envelopes[i][1];
          
            if (currentHeight > dp[maxLength]) {
                // Current height is larger than all existing subsequence tails
                // Extend the longest subsequence
                maxLength++;
                dp[maxLength] = currentHeight;
            } else {
                // Find the position to replace using binary search
                // We need to find the leftmost position where dp[pos] >= currentHeight
                int left = 1;
                int right = maxLength;
              
                while (left < right) {
                    int mid = (left + right) >> 1;  // Equivalent to (left + right) / 2
                    if (dp[mid] >= currentHeight) {
                        right = mid;  // Search in left half including mid
                    } else {
                        left = mid + 1;  // Search in right half
                    }
                }
              
                // After binary search, left is the position where dp[left] >= currentHeight
                // Replace dp[left] with currentHeight to maintain the smallest tail property
                int position = (dp[left] >= currentHeight) ? left : 1;
                dp[position] = currentHeight;
            }
        }
      
        return maxLength;
    }
}
