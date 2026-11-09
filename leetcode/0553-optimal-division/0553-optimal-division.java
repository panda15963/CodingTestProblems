class Solution {
    /**
     * Finds the optimal way to add parentheses in a division expression to maximize the result.
     * 
     * The key insight: For an expression a/b/c/d..., to maximize the result,
     * we want to minimize the denominator. This is achieved by making everything
     * after the first number into one group: a/(b/c/d...)
     * 
     * @param nums Array of integers representing the division expression
     * @return String representation of the optimal division with parentheses
     */
    public String optimalDivision(int[] nums) {
        int length = nums.length;
      
        // Base case: single number
        if (length == 1) {
            return String.valueOf(nums[0]);
        }
      
        // Base case: two numbers, no parentheses needed
        if (length == 2) {
            return nums[0] + "/" + nums[1];
        }
      
        // For three or more numbers: a/(b/c/d/...)
        // Start building the result with first number and opening parenthesis
        StringBuilder result = new StringBuilder();
        result.append(nums[0]).append("/(");
      
        // Add all middle numbers with division operators
        for (int i = 1; i < length - 1; i++) {
            result.append(nums[i]).append("/");
        }
      
        // Add the last number and closing parenthesis
        result.append(nums[length - 1]).append(")");
      
        return result.toString();
    }
}
