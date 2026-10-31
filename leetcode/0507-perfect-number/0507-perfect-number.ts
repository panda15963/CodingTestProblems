/**
 * Checks if a number is a perfect number
 * A perfect number is a positive integer that equals the sum of its positive divisors, excluding itself
 * @param num - The number to check
 * @returns true if num is a perfect number, false otherwise
 */
function checkPerfectNumber(num: number): boolean {
    // Perfect numbers must be greater than 1
    if (num <= 1) {
        return false;
    }
  
    // Initialize sum with 1 (since 1 is always a divisor)
    let divisorSum: number = 1;
  
    // Iterate through potential divisors up to sqrt(num)
    // We only need to check up to sqrt(num) for efficiency
    for (let divisor: number = 2; divisor * divisor <= num; divisor++) {
        // Check if current number is a divisor
        if (num % divisor === 0) {
            // Add the divisor to sum
            divisorSum += divisor;
          
            // Add the corresponding pair divisor (num/divisor) if it's different
            // This avoids double-counting when divisor equals sqrt(num)
            if (divisor * divisor !== num) {
                divisorSum += num / divisor;
            }
        }
    }
  
    // Check if sum of divisors equals the original number
    return divisorSum === num;
}
