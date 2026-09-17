class Solution {
    /**
     * Rearranges the array into a wiggle pattern where nums[0] < nums[1] > nums[2] < nums[3]...
     * Algorithm:
     * 1. Create a sorted copy of the input array
     * 2. Split conceptually into two halves: smaller half and larger half
     * 3. Place elements from each half alternately, starting with smaller half
     * 4. Traverse both halves from right to left to avoid equal adjacent elements
     * 
     * @param nums the input array to be rearranged in-place
     */
    public void wiggleSort(int[] nums) {
        // Create a copy of the original array and sort it
        int[] sortedArray = nums.clone();
        Arrays.sort(sortedArray);
      
        // Get the length of the array
        int length = nums.length;
      
        // Calculate the middle index (end of smaller half)
        // For odd length, smaller half has one more element
        int middleIndex = (length - 1) >> 1;  // Equivalent to (length - 1) / 2
      
        // Index for the larger half (starts from the last element)
        int largerHalfIndex = length - 1;
      
        // Fill the original array with wiggle pattern
        for (int currentIndex = 0; currentIndex < length; currentIndex++) {
            if (currentIndex % 2 == 0) {
                // Even indices get elements from the smaller half (traversing right to left)
                nums[currentIndex] = sortedArray[middleIndex];
                middleIndex--;
            } else {
                // Odd indices get elements from the larger half (traversing right to left)
                nums[currentIndex] = sortedArray[largerHalfIndex];
                largerHalfIndex--;
            }
        }
    }
}
