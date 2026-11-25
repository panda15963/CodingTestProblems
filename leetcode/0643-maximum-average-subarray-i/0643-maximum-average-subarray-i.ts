/**
 * Finds the maximum average of any contiguous subarray of length k
 * @param nums - The input array of numbers
 * @param k - The length of the subarray to find maximum average
 * @returns The maximum average value
 */
function findMaxAverage(nums: number[], k: number): number {
    // Calculate the sum of the first k elements
    let currentSum: number = 0;
    for (let i = 0; i < k; ++i) {
        currentSum += nums[i];
    }
  
    // Initialize the maximum sum with the first window's sum
    let maxSum: number = currentSum;
  
    // Use sliding window technique to find the maximum sum
    // Move the window one position at a time
    for (let i = k; i < nums.length; ++i) {
        // Remove the leftmost element of the previous window and add the new rightmost element
        currentSum += nums[i] - nums[i - k];
        // Update the maximum sum if current sum is greater
        maxSum = Math.max(maxSum, currentSum);
    }
  
    // Return the maximum average by dividing the maximum sum by k
    return maxSum / k;
}
