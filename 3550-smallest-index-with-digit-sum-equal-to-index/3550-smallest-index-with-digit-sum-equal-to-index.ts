/**
 * Finds the smallest index i where the sum of digits of nums[i] equals i
 * @param nums - Array of non-negative integers
 * @returns The smallest valid index, or -1 if no such index exists
 */
function smallestIndex(nums: number[]): number {
    // Iterate through each index in the array
    for (let i = 0; i < nums.length; ++i) {
        // Initialize sum of digits
        let digitSum = 0;
      
        // Create a copy of the current number to avoid modifying the original array
        let currentNumber = nums[i];
      
        // Extract and sum each digit by repeatedly dividing by 10
        while (currentNumber > 0) {
            // Add the last digit to the sum
            digitSum += currentNumber % 10;
            // Remove the last digit by integer division
            currentNumber = Math.floor(currentNumber / 10);
        }
      
        // Check if the sum of digits equals the current index
        if (digitSum === i) {
            return i;
        }
    }
  
    // Return -1 if no valid index is found
    return -1;
}
