class Solution {
    /**
     * Search for a target value in a rotated sorted array that may contain duplicates.
     * Uses modified binary search to handle the rotation and duplicates.
     *
     * @param nums   the rotated sorted array with possible duplicates
     * @param target the value to search for
     * @return true if target exists in the array, false otherwise
     */
    public boolean search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            int mid = (left + right) >> 1;  // Equivalent to (left + right) / 2

            // Case 1: Left half is sorted (mid is in the left sorted portion)
            if (nums[mid] > nums[right]) {
                // Check if target is within the sorted left half
                if (nums[left] <= target && target <= nums[mid]) {
                    right = mid;  // Target must be in left half, inclusive of mid
                } else {
                    left = mid + 1;  // Target must be in right half
                }
            }
            // Case 2: Right half is sorted (mid is in the right sorted portion)
            else if (nums[mid] < nums[right]) {
                // Check if target is within the sorted right half
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;  // Target must be in right half
                } else {
                    right = mid;  // Target must be in left half, inclusive of mid
                }
            }
            // Case 3: Cannot determine which half is sorted due to duplicates
            else {
                // nums[mid] == nums[right], shrink search space by moving right pointer
                right--;
            }
        }

        // Check if the remaining element is the target
        return nums[left] == target;
    }
}
