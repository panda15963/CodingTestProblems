class Solution {
    public int sumOfSquares(int[] nums) {
        // Get the length of the input array
        int arrayLength = nums.length;
      
        // Initialize the sum accumulator
        int sumOfSquares = 0;
      
        // Iterate through positions 1 to n (inclusive)
        for (int position = 1; position <= arrayLength; ++position) {
            // Check if current position is a divisor of array length
            if (arrayLength % position == 0) {
                // If yes, add the square of the element at (position-1) index
                // Note: position is 1-indexed, array is 0-indexed
                int currentElement = nums[position - 1];
                sumOfSquares += currentElement * currentElement;
            }
        }
      
        // Return the total sum of squares of elements at divisor positions
        return sumOfSquares;
    }
}
