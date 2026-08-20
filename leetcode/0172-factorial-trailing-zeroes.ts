/**
 * Calculates the number of trailing zeroes in n! (n factorial)
 * 
 * The number of trailing zeroes is determined by the number of times 10 is a factor in n!
 * Since 10 = 2 × 5, and there are always more factors of 2 than 5 in n!,
 * we only need to count the number of factors of 5
 * 
 * @param n - The input number to calculate factorial trailing zeroes for
 * @returns The count of trailing zeroes in n!
 */
function trailingZeroes(n: number): number {
    let trailingZeroCount: number = 0;
  
    // Count all factors of 5 in numbers from 1 to n
    // We divide by 5, 25, 125, etc. to count multiples of 5^1, 5^2, 5^3, etc.
    while (n > 0) {
        // Integer division by 5 to count multiples of current power of 5
        n = Math.floor(n / 5);
      
        // Add the count of multiples to our total
        trailingZeroCount += n;
    }
  
    return trailingZeroCount;
}
