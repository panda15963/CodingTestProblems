class Solution {
    /**
     * Counts the number of valid triangles that can be formed from the array.
     * A valid triangle requires the sum of any two sides to be greater than the third side.
     *
     * @param nums Array of side lengths
     * @return Number of valid triangles
     */
    public int triangleNumber(int[] nums) {
        // Sort the array to enable two-pointer technique
        Arrays.sort(nums);

        int arrayLength = nums.length;
        int triangleCount = 0;

        // Fix the largest side and find valid pairs for the other two sides
        for (int largestIndex = arrayLength - 1; largestIndex >= 2; largestIndex--) {
            int left = 0;
            int right = largestIndex - 1;

            // Use two pointers to find all valid pairs
            while (left < right) {
                // Check if current pair forms a valid triangle with the largest side
                if (nums[left] + nums[right] > nums[largestIndex]) {
                    // All elements between left and right form valid triangles
                    // because array is sorted and nums[left+1...right] are all greater than nums[left]
                    triangleCount += right - left;
                    right--;
                } else {
                    // Sum is too small, need a larger value
                    left++;
                }
            }
        }

        return triangleCount;
    }
}
