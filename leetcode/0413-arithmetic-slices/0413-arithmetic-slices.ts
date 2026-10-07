/**
 * Counts the total number of arithmetic slices in an array.
 * An arithmetic slice is a subarray of at least 3 elements with constant difference between consecutive elements.
 * 
 * @param nums - The input array of numbers
 * @returns The total count of arithmetic slices
 */
function numberOfArithmeticSlices(nums: number[]): number {
    let totalSlices: number = 0;  // Total count of arithmetic slices found
    let currentSliceCount: number = 0;  // Count of arithmetic slices ending at current position
    let currentDifference: number = 3000;  // Current difference between consecutive elements (initialized to impossible value)
  
    // Iterate through the array comparing consecutive pairs
    for (let i: number = 0; i < nums.length - 1; i++) {
        const currentElement: number = nums[i];
        const nextElement: number = nums[i + 1];
        const difference: number = nextElement - currentElement;
      
        if (difference === currentDifference) {
            // If difference matches the previous difference, we can extend the arithmetic sequence
            currentSliceCount++;
        } else {
            // If difference changes, start a new potential arithmetic sequence
            currentDifference = difference;
            currentSliceCount = 0;
        }
      
        // Add the count of new arithmetic slices ending at position i+1
        totalSlices += currentSliceCount;
    }
  
    return totalSlices;
}
