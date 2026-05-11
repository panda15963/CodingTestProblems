class Solution {
    /**
     * Separates each number in the input array into its individual digits
     * and returns all digits in a single array maintaining the original order.
     * 
     * @param nums The input array of integers to separate
     * @return An array containing all individual digits from the input numbers
     */
    public int[] separateDigits(int[] nums) {
        // List to store all separated digits
        List<Integer> resultList = new ArrayList<>();
      
        // Process each number in the input array
        for (int number : nums) {
            // Temporary list to store digits of current number
            List<Integer> digitsOfCurrentNumber = new ArrayList<>();
          
            // Extract digits from right to left using modulo and division
            while (number > 0) {
                digitsOfCurrentNumber.add(number % 10);  // Get the rightmost digit
                number /= 10;  // Remove the rightmost digit
            }
          
            // Reverse to get digits in correct order (left to right)
            Collections.reverse(digitsOfCurrentNumber);
          
            // Add all digits of current number to the result list
            resultList.addAll(digitsOfCurrentNumber);
        }
      
        // Convert List<Integer> to int array
        int[] resultArray = new int[resultList.size()];
        for (int i = 0; i < resultArray.length; i++) {
            resultArray[i] = resultList.get(i);
        }
      
        return resultArray;
    }
}