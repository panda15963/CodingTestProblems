/**
 * Computes the maximum value array based on prefix maximum and suffix minimum
 * @param nums - Input array of numbers
 * @returns Array where each element represents a computed maximum value
 */
function maxValue(nums: number[]): number[] {
    const n: number = nums.length;
  
    // Initialize result array with zeros
    const result: number[] = Array(n).fill(0);
  
    // Build prefix maximum array where prefixMax[i] stores max value from index 0 to i
    const prefixMax: number[] = Array(n).fill(nums[0]);
    for (let i = 1; i < n; i++) {
        prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
    }
  
    // Initialize suffix minimum with a large value (2^30)
    let suffixMin: number = 1 << 30;
  
    // Traverse from right to left to compute result and update suffix minimum
    for (let i = n - 1; i >= 0; i--) {
        // If prefix max at current position is greater than suffix min,
        // use the next element's result; otherwise use current prefix max
        result[i] = prefixMax[i] > suffixMin ? result[i + 1] : prefixMax[i];
      
        // Update suffix minimum with current element
        suffixMin = Math.min(suffixMin, nums[i]);
    }
  
    return result;
}