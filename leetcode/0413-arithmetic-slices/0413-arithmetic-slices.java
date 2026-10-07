class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        // Total count of arithmetic slices
        int totalCount = 0;
      
        // Count of consecutive pairs with the same difference
        // This represents how many arithmetic slices end at current position
        int currentStreakCount = 0;
      
        // Initialize with an impossible difference value
        // (since array values are in range [-1000, 1000], max difference is 2000)
        int currentDifference = 3000;
      
        // Iterate through consecutive pairs in the array
        for (int i = 0; i < nums.length - 1; i++) {
            int difference = nums[i + 1] - nums[i];
          
            if (difference == currentDifference) {
                // Same difference as previous pair, extend the streak
                currentStreakCount++;
            } else {
                // Different difference, start a new streak
                currentDifference = difference;
                currentStreakCount = 0;
            }
          
            // Add current streak count to total
            // When we have k consecutive pairs with same difference,
            // we can form k arithmetic slices ending at current position
            totalCount += currentStreakCount;
        }
      
        return totalCount;
    }
}
