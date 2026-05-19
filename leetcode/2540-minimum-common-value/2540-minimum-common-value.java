class Solution {
    /**
     * Finds the minimum common integer in two sorted arrays.
     * Uses two-pointer technique to efficiently traverse both arrays.
     *
     * @param nums1 First sorted array in non-decreasing order
     * @param nums2 Second sorted array in non-decreasing order
     * @return The minimum common integer if exists, otherwise -1
     */
    public int getCommon(int[] nums1, int[] nums2) {
        // Get the lengths of both arrays
        int length1 = nums1.length;
        int length2 = nums2.length;

        // Initialize two pointers for traversing both arrays
        int pointer1 = 0;
        int pointer2 = 0;

        // Traverse both arrays simultaneously until one is exhausted
        while (pointer1 < length1 && pointer2 < length2) {
            // If elements are equal, we found the minimum common element
            if (nums1[pointer1] == nums2[pointer2]) {
                return nums1[pointer1];
            }

            // Move the pointer pointing to the smaller element
            if (nums1[pointer1] < nums2[pointer2]) {
                pointer1++;
            } else {
                pointer2++;
            }
        }

        // No common element found
        return -1;
    }
}