/**
 * Generates an array of strings following the FizzBuzz pattern
 * @param n - The upper limit of the range (inclusive)
 * @returns An array of strings where multiples of 3 are "Fizz", 
 *          multiples of 5 are "Buzz", multiples of both are "FizzBuzz",
 *          and other numbers are their string representation
 */
function fizzBuzz(n: number): string[] {
    // Initialize the result array to store FizzBuzz sequence
    const result: string[] = [];
  
    // Iterate through numbers from 1 to n (inclusive)
    for (let i = 1; i <= n; i++) {
        // Check if divisible by both 3 and 5 (i.e., divisible by 15)
        if (i % 15 === 0) {
            result.push('FizzBuzz');
        } 
        // Check if divisible by 3 only
        else if (i % 3 === 0) {
            result.push('Fizz');
        } 
        // Check if divisible by 5 only
        else if (i % 5 === 0) {
            result.push('Buzz');
        } 
        // For all other numbers, add the number as a string
        else {
            result.push(i.toString());
        }
    }
  
    return result;
}
