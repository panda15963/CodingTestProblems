/**
 * Rotates array to the right by k steps using the reversal algorithm.
 * Do not return anything, modify nums in-place instead.
 * @param nums - The array to be rotated
 * @param k - The number of steps to rotate right
 */
function rotate(nums: number[], k: number): void {
    const arrayLength: number = nums.length;
  
    // Handle cases where k is greater than array length
    k = k % arrayLength;
  
    /**
     * Helper function to reverse a portion of the array in-place
     * @param startIndex - Starting index of the portion to reverse
     * @param endIndex - Ending index of the portion to reverse
     */
    const reverseSection = (startIndex: number, endIndex: number): void => {
        // Swap elements from both ends moving towards the center
        while (startIndex < endIndex) {
            // Swap elements at startIndex and endIndex
            const temp: number = nums[startIndex];
            nums[startIndex] = nums[endIndex];
            nums[endIndex] = temp;
          
            // Move pointers towards the center
            startIndex++;
            endIndex--;
        }
    };
  
    // Step 1: Reverse the entire array
    reverseSection(0, arrayLength - 1);
  
    // Step 2: Reverse the first k elements
    reverseSection(0, k - 1);
  
    // Step 3: Reverse the remaining elements (from k to end)
    reverseSection(k, arrayLength - 1);
}
