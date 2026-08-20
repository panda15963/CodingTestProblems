class Solution {
    /**
     * Calculate the number of trailing zeroes in n! (n factorial).
     * 
     * Trailing zeroes are produced by factors of 10, and 10 = 2 * 5.
     * Since there are always more factors of 2 than 5 in n!,
     * we only need to count the number of factors of 5.
     * 
     * @param n The input number to calculate factorial trailing zeroes
     * @return The number of trailing zeroes in n!
     */
    public int trailingZeroes(int n) {
        int trailingZeroCount = 0;
      
        // Count all factors of 5 in numbers from 1 to n
        // n/5 gives count of numbers divisible by 5
        // n/25 gives count of numbers divisible by 25 (contributing an extra 5)
        // n/125 gives count of numbers divisible by 125 (contributing another extra 5)
        // And so on...
        while (n > 0) {
            n /= 5;  // Integer division to get the count at current power of 5
            trailingZeroCount += n;  // Add the count to total
        }
      
        return trailingZeroCount;
    }
}
