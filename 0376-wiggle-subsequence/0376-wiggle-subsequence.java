class Solution {
    public int wiggleMaxLength(int[] nums) {
        int n = nums.length;
      
        // dp[i] represents the max wiggle length ending at index i with an upward trend
        int[] dpUp = new int[n];
        // dp[i] represents the max wiggle length ending at index i with a downward trend
        int[] dpDown = new int[n];
      
        // Initialize: single element can be considered as both up and down ending
        dpUp[0] = 1;
        dpDown[0] = 1;
      
        int maxLength = 1;
      
        // Fill the dp arrays
        for (int i = 1; i < n; i++) {
            // For each position i, check all previous positions j
            for (int j = 0; j < i; j++) {
                // If current > previous, we can extend a down-ending sequence
                if (nums[j] < nums[i]) {
                    dpUp[i] = Math.max(dpUp[i], dpDown[j] + 1);
                } 
                // If current < previous, we can extend an up-ending sequence
                else if (nums[j] > nums[i]) {
                    dpDown[i] = Math.max(dpDown[i], dpUp[j] + 1);
                }
            }
          
            // Update the maximum wiggle length found so far
            maxLength = Math.max(maxLength, Math.max(dpUp[i], dpDown[i]));
        }
      
        return maxLength;
    }
}
