class Solution {
    /**
     * Checks if a given number is a perfect number.
     * A perfect number is a positive integer that equals the sum of its positive divisors,
     * excluding the number itself.
     * 
     * @param num The number to check
     * @return true if num is a perfect number, false otherwise
     */
    public boolean checkPerfectNumber(int num) {
        // Edge case: 1 is not a perfect number (has no proper divisors except itself)
        if (num == 1) {
            return false;
        }
      
        // Initialize sum with 1 (since 1 is always a divisor of any number > 1)
        int sumOfDivisors = 1;
      
        // Iterate through potential divisors up to sqrt(num)
        // We only need to check up to sqrt(num) for efficiency
        for (int divisor = 2; divisor * divisor <= num; divisor++) {
            // Check if current number is a divisor
            if (num % divisor == 0) {
                // Add the divisor to the sum
                sumOfDivisors += divisor;
              
                // Add the corresponding pair divisor (num/divisor)
                // But avoid adding the same divisor twice when divisor = sqrt(num)
                if (divisor != num / divisor) {
                    sumOfDivisors += num / divisor;
                }
            }
        }
      
        // A perfect number equals the sum of its proper divisors
        return sumOfDivisors == num;
    }
}
