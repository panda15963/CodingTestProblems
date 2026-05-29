class Solution {
    /**
     * Finds the minimum element after replacing each number with the sum of its digits.
     * 
     * @param nums the input array of integers
     * @return the minimum value after digit sum transformation
     */
    public int minElement(int[] nums) {
        // Initialize minimum value to a large number (assuming digit sums won't exceed 100)
        int minDigitSum = 100;
      
        // Iterate through each number in the array
        for (int number : nums) {
            // Calculate the sum of digits for the current number
            int digitSum = 0;
          
            // Extract and sum each digit by repeatedly dividing by 10
            while (number > 0) {
                digitSum += number % 10;  // Add the last digit to the sum
                number /= 10;              // Remove the last digit
            }
          
            // Update the minimum digit sum if current sum is smaller
            minDigitSum = Math.min(minDigitSum, digitSum);
        }
      
        return minDigitSum;
    }
}
