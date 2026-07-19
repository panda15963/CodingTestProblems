/**
 * Finds the first missing positive integer in an array
 * Uses cyclic sort to place each number at its correct index position
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * @param nums - Array of integers
 * @returns The smallest missing positive integer
 */
function firstMissingPositive(nums: number[]): number {
    const arrayLength: number = nums.length;
  
    // Step 1: Place each positive number at its correct index position
    // Number 1 should be at index 0, number 2 at index 1, etc.
    for (let currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
        // Keep swapping while:
        // - Current number is in valid range [1, n]
        // - Current number is not already at its correct position
        while (nums[currentIndex] >= 1 && 
               nums[currentIndex] <= arrayLength && 
               nums[currentIndex] !== nums[nums[currentIndex] - 1]) {
          
            // Calculate target index for the current number
            const targetIndex: number = nums[currentIndex] - 1;
          
            // Swap current number with the number at its target position
            [nums[currentIndex], nums[targetIndex]] = [nums[targetIndex], nums[currentIndex]];
        }
    }
  
    // Step 2: Find the first position where number doesn't match (index + 1)
    for (let index = 0; index < arrayLength; index++) {
        // If number at index i is not (i + 1), then (i + 1) is missing
        if (nums[index] !== index + 1) {
            return index + 1;
        }
    }
  
    // Step 3: All numbers from 1 to n are present, so return n + 1
    return arrayLength + 1;
}