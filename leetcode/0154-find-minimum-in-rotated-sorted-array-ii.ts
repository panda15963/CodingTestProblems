/**
 * Finds the minimum element in a rotated sorted array that may contain duplicates
 * Uses binary search with special handling for duplicate values
 * Time Complexity: O(log n) average case, O(n) worst case when many duplicates exist
 * Space Complexity: O(1)
 * 
 * @param nums - The rotated sorted array that may contain duplicates
 * @returns The minimum element in the array
 */
function findMin(nums: number[]): number {
    // Initialize binary search boundaries
    let left: number = 0;
    let right: number = nums.length - 1;
  
    // Continue searching while the search space has more than one element
    while (left < right) {
        // Calculate middle index using bit shift for integer division
        const mid: number = (left + right) >> 1;
      
        // Case 1: Mid element is greater than right element
        // The minimum must be in the right half (after mid)
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } 
        // Case 2: Mid element is less than right element
        // The minimum is in the left half (including mid)
        else if (nums[mid] < nums[right]) {
            right = mid;
        } 
        // Case 3: Mid element equals right element
        // Cannot determine which half contains minimum, safely exclude right element
        else {
            right--;
        }
    }
  
    // When left equals right, we've found the minimum element
    return nums[left];
}