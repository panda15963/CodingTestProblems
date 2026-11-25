class Solution {
    public double findMaxAverage(int[] nums, int k) {
        // Calculate the sum of the first k elements
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
      
        // Initialize the maximum sum with the first window's sum
        int maxSum = windowSum;
      
        // Slide the window through the rest of the array
        for (int i = k; i < nums.length; i++) {
            // Update window sum by removing the leftmost element of previous window
            // and adding the new rightmost element
            windowSum += nums[i] - nums[i - k];
          
            // Update the maximum sum if current window sum is greater
            maxSum = Math.max(maxSum, windowSum);
        }
      
        // Return the maximum average by dividing the maximum sum by k
        return (double) maxSum / k;
    }
}
