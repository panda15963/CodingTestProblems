/**
 * Searches for a target value in a rotated sorted array that may contain duplicates.
 * Uses modified binary search to handle the rotation and duplicates.
 *
 * @param {number[]} nums - The rotated sorted array with possible duplicates
 * @param {number} target - The value to search for
 * @returns {boolean} true if target exists in the array, false otherwise
 */
function search(nums, target) {
    // Initialize left and right pointers for binary search
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        // Calculate middle index using bit shift for efficiency
        const middle = (left + right) >> 1;

        // Case 1: Left half is sorted (middle element is greater than rightmost)
        if (nums[middle] > nums[right]) {
            // Check if target lies within the sorted left half
            if (nums[left] <= target && target <= nums[middle]) {
                // Target is in left half, move right pointer to middle
                right = middle;
            } else {
                // Target is in right half, move left pointer past middle
                left = middle + 1;
            }
        }
        // Case 2: Right half is sorted (middle element is less than rightmost)
        else if (nums[middle] < nums[right]) {
            // Check if target lies within the sorted right half
            if (nums[middle] < target && target <= nums[right]) {
                // Target is in right half, move left pointer past middle
                left = middle + 1;
            } else {
                // Target is in left half, move right pointer to middle
                right = middle;
            }
        }
        // Case 3: Cannot determine which half is sorted due to duplicates
        else {
            // Decrement right pointer to eliminate duplicate and continue
            right--;
        }
    }

    // Check if the remaining element is the target
    return nums[left] === target;
}