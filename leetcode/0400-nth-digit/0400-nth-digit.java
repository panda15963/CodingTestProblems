class Solution {
    public int findNthDigit(int n) {
        // Number of digits in current range (1-digit numbers, 2-digit numbers, etc.)
        int digitsPerNumber = 1;
      
        // Count of numbers in current range (9 one-digit numbers, 90 two-digit numbers, etc.)
        int countInRange = 9;
      
        // Find which range contains the nth digit
        // Check if n falls within current range of k-digit numbers
        while ((long) digitsPerNumber * countInRange < n) {
            // Subtract the total digits in current range from n
            n -= digitsPerNumber * countInRange;
          
            // Move to next range (from 1-digit to 2-digit, etc.)
            digitsPerNumber++;
          
            // Update count for next range (9 -> 90 -> 900, etc.)
            countInRange *= 10;
        }
      
        // Calculate the actual number that contains the nth digit
        // Starting number of current range (1, 10, 100, etc.)
        int startNumber = (int) Math.pow(10, digitsPerNumber - 1);
      
        // Find which number in the range contains our target digit
        // (n - 1) / digitsPerNumber gives us the offset from start number
        int targetNumber = startNumber + (n - 1) / digitsPerNumber;
      
        // Find the position of the digit within the target number
        // (n - 1) % digitsPerNumber gives us the index within the number
        int digitIndex = (n - 1) % digitsPerNumber;
      
        // Convert number to string and extract the digit at the calculated index
        return String.valueOf(targetNumber).charAt(digitIndex) - '0';
    }
}
