class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
      
        // Prefix sum array to track count of reachable positions
        // prefixSum[i] stores the count of reachable positions from index 0 to i-1
        int[] prefixSum = new int[n + 1];
        prefixSum[1] = 1; // Position 0 is reachable (starting position)
      
        // Dynamic programming array to track if position i is reachable
        boolean[] isReachable = new boolean[n];
        isReachable[0] = true; // Starting position is always reachable
      
        // Iterate through each position in the string
        for (int i = 1; i < n; i++) {
            // Can only jump to positions with '0'
            if (s.charAt(i) == '0') {
                // Calculate the valid range of positions we can jump from
                // We can jump from position j to i if: i - maxJump <= j <= i - minJump
                int leftBound = Math.max(0, i - maxJump);
                int rightBound = i - minJump;
              
                // Check if there exists at least one reachable position in the range [leftBound, rightBound]
                // Using prefix sum to efficiently check if any position in range is reachable
                isReachable[i] = leftBound <= rightBound && 
                                prefixSum[rightBound + 1] - prefixSum[leftBound] > 0;
            }
          
            // Update prefix sum array
            // Add 1 if current position is reachable, otherwise add 0
            prefixSum[i + 1] = prefixSum[i] + (isReachable[i] ? 1 : 0);
        }
      
        // Return whether the last position is reachable
        return isReachable[n - 1];
    }
}