class Solution {
    public boolean find132pattern(int[] nums) {
        // Initialize the potential "middle value" (nums[k] in the 132 pattern)
        // Using Integer.MIN_VALUE as initial value (more readable than bit shifting)
        int middleValue = Integer.MIN_VALUE;
      
        // Stack to maintain potential "maximum values" (nums[j] in the 132 pattern)
        // Using monotonic decreasing stack approach
        Deque<Integer> stack = new ArrayDeque<>();
      
        // Traverse the array from right to left
        // This allows us to maintain nums[j] and nums[k] while looking for nums[i]
        for (int i = nums.length - 1; i >= 0; i--) {
            // Check if current element can be nums[i] (smallest in 132 pattern)
            // If nums[i] < middleValue, we found a valid 132 pattern
            if (nums[i] < middleValue) {
                return true;
            }
          
            // Update middleValue by popping smaller elements from stack
            // These popped elements become candidates for nums[k] (middle value)
            // Current nums[i] will act as nums[j] (maximum value)
            while (!stack.isEmpty() && stack.peek() < nums[i]) {
                middleValue = stack.pop();
            }
          
            // Push current element to stack as a potential nums[j] (maximum value)
            stack.push(nums[i]);
        }
      
        // No 132 pattern found in the array
        return false;
    }
}
