class Solution {
    /**
     * Finds the maximum product of (nums[i] - 1) * (nums[j] - 1) for all pairs i < j.
     * 
     * @param nums the input array of integers
     * @return the maximum product of any two different elements after subtracting 1 from each
     */
    public int maxProduct(int[] nums) {
        // Initialize the maximum product to 0
        int maxProductValue = 0;
      
        // Get the length of the input array
        int arrayLength = nums.length;
      
        // Iterate through all pairs of indices where i < j
        for (int i = 0; i < arrayLength; ++i) {
            for (int j = i + 1; j < arrayLength; ++j) {
                // Calculate the product of (nums[i] - 1) and (nums[j] - 1)
                int currentProduct = (nums[i] - 1) * (nums[j] - 1);
              
                // Update the maximum product if current product is larger
                maxProductValue = Math.max(maxProductValue, currentProduct);
            }
        }
      
        // Return the maximum product found
        return maxProductValue;
    }
}