class Solution {
    private int[] nums;
    private Random random = new Random();

    /**
     * Constructor to initialize the Solution with the given array
     * @param nums The input array
     */
    public Solution(int[] nums) {
        this.nums = nums;
    }

    /**
     * Randomly picks an index where nums[index] == target
     * Uses reservoir sampling algorithm to ensure uniform distribution
     * @param target The target value to search for
     * @return A random index where nums[index] == target
     */
    public int pick(int target) {
        int count = 0;           // Count of elements equal to target found so far
        int resultIndex = 0;     // The selected index to return
      
        // Iterate through the entire array
        for (int i = 0; i < nums.length; i++) {
            // Check if current element equals target
            if (nums[i] == target) {
                count++;
              
                // Generate random number from 1 to count (inclusive)
                int randomNum = 1 + random.nextInt(count);
              
                // With probability 1/count, update the result to current index
                // This ensures each valid index has equal probability of being selected
                if (randomNum == count) {
                    resultIndex = i;
                }
            }
        }
      
        return resultIndex;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(nums);
 * int param_1 = obj.pick(target);
 */
