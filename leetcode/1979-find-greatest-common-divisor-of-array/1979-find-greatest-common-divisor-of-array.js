/**
 * Finds the greatest common divisor (GCD) of the minimum and maximum values in an array
 * @param {number[]} nums - Array of positive integers
 * @return {number} The GCD of the minimum and maximum values
 */
var findGCD = function(nums) {
    // Find the minimum value in the array
    const min = Math.min(...nums);

    // Find the maximum value in the array
    const max = Math.max(...nums);

    // Calculate and return the GCD of min and max
    return gcd(min, max);
};

/**
 * Calculates the greatest common divisor of two numbers using the Euclidean algorithm
 * @param {number} a - First positive integer
 * @param {number} b - Second positive integer
 * @return {number} The greatest common divisor of a and b
 */
function gcd(a, b) {
    // Base case: if b is 0, then GCD is a
    if (b === 0) {
        return a;
    }

    // Recursive case: GCD(a, b) = GCD(b, a % b)
    return gcd(b, a % b);
}