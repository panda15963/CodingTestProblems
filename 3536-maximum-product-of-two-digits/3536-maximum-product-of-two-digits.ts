/**
 * Finds the maximum product of two distinct digits in a number
 * @param n - The input number to process
 * @returns The maximum product of two digits
 */
function maxProduct(n: number): number {
    // Initialize variables to track the two largest digits
    let largestDigit: number = 0;
    let secondLargestDigit: number = 0;
  
    // Process each digit from right to left
    while (n > 0) {
        // Extract the rightmost digit
        const currentDigit: number = n % 10;
      
        // Update the two largest digits based on current digit
        if (currentDigit > largestDigit) {
            // Current digit becomes the new largest, previous largest becomes second largest
            secondLargestDigit = largestDigit;
            largestDigit = currentDigit;
        } else if (currentDigit > secondLargestDigit) {
            // Current digit becomes the new second largest
            secondLargestDigit = currentDigit;
        }
      
        // Remove the rightmost digit for next iteration
        n = Math.floor(n / 10);
    }
  
    // Return the product of the two largest digits
    return largestDigit * secondLargestDigit;
}