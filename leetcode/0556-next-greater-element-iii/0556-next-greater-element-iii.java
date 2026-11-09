class Solution {
    public int nextGreaterElement(int n) {
        // Convert number to character array for manipulation
        char[] digits = String.valueOf(n).toCharArray();
        int length = digits.length;
      
        // Step 1: Find the first digit from right that is smaller than its next digit
        // This is the pivot point where we need to make a swap
        int pivotIndex = length - 2;
        while (pivotIndex >= 0 && digits[pivotIndex] >= digits[pivotIndex + 1]) {
            pivotIndex--;
        }
      
        // If no such digit found, the number is already the largest permutation
        if (pivotIndex < 0) {
            return -1;
        }
      
        // Step 2: Find the smallest digit to the right of pivot that is larger than pivot
        // This digit will be swapped with the pivot
        int swapIndex = length - 1;
        while (digits[pivotIndex] >= digits[swapIndex]) {
            swapIndex--;
        }
      
        // Step 3: Swap the pivot with the found digit
        swap(digits, pivotIndex, swapIndex);
      
        // Step 4: Reverse all digits after pivot position to get the smallest arrangement
        // This ensures we get the next greater number, not just any greater number
        reverse(digits, pivotIndex + 1, length - 1);
      
        // Convert back to number and check for integer overflow
        long result = Long.parseLong(String.valueOf(digits));
        return result > Integer.MAX_VALUE ? -1 : (int) result;
    }
  
    /**
     * Helper method to swap two characters in an array
     * @param digits the character array
     * @param i first index to swap
     * @param j second index to swap
     */
    private void swap(char[] digits, int i, int j) {
        char temp = digits[i];
        digits[i] = digits[j];
        digits[j] = temp;
    }
  
    /**
     * Helper method to reverse a portion of the character array
     * @param digits the character array
     * @param start starting index (inclusive)
     * @param end ending index (inclusive)
     */
    private void reverse(char[] digits, int start, int end) {
        while (start < end) {
            swap(digits, start, end);
            start++;
            end--;
        }
    }
}
