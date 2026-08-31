class Solution {
    /**
     * Main method to solve the house robber problem with houses arranged in a circle.
     * Since the first and last houses are adjacent (circular arrangement),
     * we cannot rob both of them. So we consider two scenarios:
     * 1. Rob houses from index 0 to n-2 (exclude last house)
     * 2. Rob houses from index 1 to n-1 (exclude first house)
     * Return the maximum of these two scenarios.
     * 
     * @param nums Array representing money in each house
     * @return Maximum amount that can be robbed
     */
    public int rob(int[] nums) {
        int n = nums.length;
      
        // Edge case: only one house
        if (n == 1) {
            return nums[0];
        }
      
        // Compare two scenarios: rob houses [0, n-2] vs [1, n-1]
        return Math.max(
            rob(nums, 0, n - 2),  // Scenario 1: include first house, exclude last
            rob(nums, 1, n - 1)   // Scenario 2: exclude first house, include last
        );
    }

    /**
     * Helper method to find maximum robbery amount for a linear range of houses.
     * Uses dynamic programming with space optimization.
     * 
     * @param nums Array representing money in each house
     * @param start Starting index (inclusive)
     * @param end Ending index (inclusive)
     * @return Maximum amount that can be robbed in the given range
     */
    private int rob(int[] nums, int start, int end) {
        // prevNotRobbed: max money when previous house is not robbed
        int prevNotRobbed = 0;
      
        // prevRobbed: max money when previous house is robbed
        int prevRobbed = 0;
      
        // Iterate through each house in the range
        for (int i = start; i <= end; i++) {
            // Calculate new max when current house is not robbed
            // (can come from either robbing or not robbing the previous house)
            int currentNotRobbed = Math.max(prevNotRobbed, prevRobbed);
          
            // Calculate new max when current house is robbed
            // (must not rob the previous house, so use prevNotRobbed)
            int currentRobbed = prevNotRobbed + nums[i];
          
            // Update states for next iteration
            prevNotRobbed = currentNotRobbed;
            prevRobbed = currentRobbed;
        }
      
        // Return the maximum of robbing or not robbing the last house
        return Math.max(prevNotRobbed, prevRobbed);
    }
}
