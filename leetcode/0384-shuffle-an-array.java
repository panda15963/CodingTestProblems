class Solution {
    // Array to store the current state (can be shuffled)
    private int[] nums;
    // Array to store the original configuration
    private int[] original;
    // Random number generator for shuffling
    private Random rand;

    /**
     * Constructor initializes the object with the integer array nums
     * @param nums The input array to be shuffled
     */
    public Solution(int[] nums) {
        this.nums = nums;
        // Create a deep copy of the original array to preserve initial state
        this.original = Arrays.copyOf(nums, nums.length);
        this.rand = new Random();
    }

    /**
     * Resets the array to its original configuration and returns it
     * @return The array in its original order
     */
    public int[] reset() {
        // Restore nums array to original configuration
        nums = Arrays.copyOf(original, original.length);
        return nums;
    }

    /**
     * Returns a random shuffling of the array using Fisher-Yates algorithm
     * @return The shuffled array
     */
    public int[] shuffle() {
        // Fisher-Yates shuffle algorithm
        // Iterate through the array from start to end
        for (int i = 0; i < nums.length; i++) {
            // Pick a random index from i to end of array
            int randomIndex = i + rand.nextInt(nums.length - i);
            // Swap current element with randomly selected element
            swap(i, randomIndex);
        }
        return nums;
    }

    /**
     * Helper method to swap two elements in the nums array
     * @param i First index to swap
     * @param j Second index to swap
     */
    private void swap(int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(nums);
 * int[] param_1 = obj.reset();
 * int[] param_2 = obj.shuffle();
 */
