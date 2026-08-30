/**
 * Finds the minimum number of deletions needed to remove both the minimum and maximum elements
 * from an array, where deletions can only happen from either end of the array.
 * 
 * @param nums - The input array of numbers
 * @returns The minimum number of deletions required
 */
function minimumDeletions(nums: number[]): number {
    const arrayLength = nums.length;
  
    // Handle edge case: single element array
    if (arrayLength === 1) {
        return 1;
    }
  
    // Find indices of minimum and maximum elements
    const minElementIndex = nums.indexOf(Math.min(...nums));
    const maxElementIndex = nums.indexOf(Math.max(...nums));
  
    // Determine which element appears first (leftmost) and last (rightmost)
    const leftmostIndex = Math.min(minElementIndex, maxElementIndex);
    const rightmostIndex = Math.max(minElementIndex, maxElementIndex);
  
    // Calculate three possible strategies:
    // Strategy 1: Delete from left to get one element, then from right to get the other
    const deleteFromBothEnds = (leftmostIndex + 1) + (arrayLength - rightmostIndex);
  
    // Strategy 2: Delete from left only to get both elements
    const deleteFromLeftOnly = rightmostIndex + 1;
  
    // Strategy 3: Delete from right only to get both elements
    const deleteFromRightOnly = arrayLength - leftmostIndex;
  
    // Return the minimum deletions among all strategies
    return Math.min(deleteFromBothEnds, deleteFromLeftOnly, deleteFromRightOnly);
}
