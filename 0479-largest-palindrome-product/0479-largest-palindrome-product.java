class Solution {
    public int largestPalindrome(int n) {
        // Calculate the maximum n-digit number
        int maxNumber = (int) Math.pow(10, n) - 1;
      
        // Iterate from the maximum n-digit number down to find the largest palindrome
        for (int firstHalf = maxNumber; firstHalf > maxNumber / 10; --firstHalf) {
            // Create a palindrome by mirroring the first half
            int tempNumber = firstHalf;
            long palindrome = firstHalf;
          
            // Append the reversed digits of firstHalf to create a palindrome
            while (tempNumber != 0) {
                palindrome = palindrome * 10 + tempNumber % 10;
                tempNumber /= 10;
            }
          
            // Check if this palindrome can be expressed as a product of two n-digit numbers
            for (long divisor = maxNumber; divisor * divisor >= palindrome; --divisor) {
                // If palindrome is divisible by divisor, we found a valid product
                if (palindrome % divisor == 0) {
                    // Return the palindrome modulo 1337
                    return (int) (palindrome % 1337);
                }
            }
        }
      
        // Special case: for n=1, the largest palindrome product is 9 (3*3=9)
        return 9;
    }
}
