/**
 * Finds the greatest common divisor (GCD) of the minimum and maximum values in an array
 * @param nums - Array of positive integers
 * @returns The GCD of the minimum and maximum values
 */
function findGCD(nums: number[]): number {
    // Find the minimum value in the array
    const min: number = Math.min(...nums);
  
    // Find the maximum value in the array
    const max: number = Math.max(...nums);
  
    // Calculate and return the GCD of min and max
    return gcd(min, max);
}

/**
 * Calculates the greatest common divisor of two numbers using Euclidean algorithm
 * @param a - First positive integer
 * @param b - Second positive integer
 * @returns The greatest common divisor of a and b
 */
function gcd(a: number, b: number): number {
    // Base case: if b is 0, then GCD is a
    if (b === 0) {
        return a;
    }
  
    // Recursive case: GCD(a, b) = GCD(b, a mod b)
    return gcd(b, a % b);
}