class Solution {
    /**
     * Generates a FizzBuzz sequence from 1 to n.
     * 
     * @param n The upper limit of the sequence (inclusive)
     * @return A list of strings representing the FizzBuzz sequence
     * 
     * Rules:
     * - Numbers divisible by 3 are replaced with "Fizz"
     * - Numbers divisible by 5 are replaced with "Buzz"
     * - Numbers divisible by both 3 and 5 are replaced with "FizzBuzz"
     * - All other numbers are converted to their string representation
     */
    public List<String> fizzBuzz(int n) {
        // Initialize the result list to store the FizzBuzz sequence
        List<String> result = new ArrayList<>();
      
        // Iterate through numbers from 1 to n (inclusive)
        for (int currentNumber = 1; currentNumber <= n; currentNumber++) {
            // Build the string representation for the current number
            String currentString = "";
          
            // Check if divisible by 3
            if (currentNumber % 3 == 0) {
                currentString += "Fizz";
            }
          
            // Check if divisible by 5
            if (currentNumber % 5 == 0) {
                currentString += "Buzz";
            }
          
            // If not divisible by 3 or 5, use the number itself
            if (currentString.length() == 0) {
                currentString += currentNumber;
            }
          
            // Add the processed string to the result list
            result.add(currentString);
        }
      
        return result;
    }
}
