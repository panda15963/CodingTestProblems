/**
 * Checks if a number is divisible by the sum of its digit sum and digit product
 * @param n - The number to check divisibility for
 * @returns true if n is divisible by (sum of digits + product of digits), false otherwise
 */
function checkDivisibility(n: number): boolean {
    // Initialize sum of digits and product of digits
    let digitSum: number = 0;
    let digitProduct: number = 1;
  
    // Create a copy of n to extract digits from
    let remainingNumber: number = n;
  
    // Extract each digit and calculate sum and product
    while (remainingNumber !== 0) {
        // Get the last digit
        const currentDigit: number = remainingNumber % 10;
      
        // Remove the last digit from the remaining number
        remainingNumber = Math.floor(remainingNumber / 10);
      
        // Update sum and product
        digitSum += currentDigit;
        digitProduct *= currentDigit;
    }
  
    // Check if n is divisible by the sum of (digit sum + digit product)
    return n % (digitSum + digitProduct) === 0;
}
