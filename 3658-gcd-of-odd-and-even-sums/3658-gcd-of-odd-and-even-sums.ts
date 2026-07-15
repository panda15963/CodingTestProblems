/**
 * Calculates the greatest common divisor (GCD) of the sum of numbers at odd positions
 * and the sum of numbers at even positions from 1 to n.
 * 
 * Mathematical insight: For consecutive integers from 1 to n:
 * - Sum of odd positions (1, 3, 5, ...) and sum of even positions (2, 4, 6, ...)
 * - The GCD of these two sums always equals n
 * 
 * @param n - The upper limit of the range [1, n]
 * @returns The GCD of odd-positioned sum and even-positioned sum
 */
function gcdOfOddEvenSums(n: number): number {
    // Direct formula: The GCD pattern simplifies to n itself
    return n;
}