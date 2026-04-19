class Solution {
    /**
     * Finds the maximum distance between two indices i and j where:
     * - i <= j
     * - nums1[i] <= nums2[j]
     * - distance = j - i
     *
     * @param nums1 First non-increasing array
     * @param nums2 Second non-increasing array
     * @return Maximum distance between valid pairs
     */
    public int maxDistance(int[] nums1, int[] nums2) {
        int maxDistance = 0;
        int n1 = nums1.length;
        int n2 = nums2.length;

        for (int i = 0; i < n1; i++) {
            int value = nums1[i];

            // Binary search to find the first index j where nums2[j] < value
            // Using the standard template: find first true index
            int left = i;
            int right = n2 - 1;
            int firstTrueIndex = -1;

            while (left <= right) {
                int mid = left + (right - left) / 2;
                if (nums2[mid] < value) {  // feasible condition: pair becomes invalid
                    firstTrueIndex = mid;
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }

            // Calculate the last valid j
            int lastValidJ;
            if (firstTrueIndex == -1) {
                // All positions from i to end are valid
                lastValidJ = n2 - 1;
            } else {
                // Last valid position is one before first invalid
                lastValidJ = firstTrueIndex - 1;
            }

            // Update maximum distance if valid pair exists
            if (lastValidJ >= i) {
                maxDistance = Math.max(maxDistance, lastValidJ - i);
            }
        }

        return maxDistance;
    }
}
