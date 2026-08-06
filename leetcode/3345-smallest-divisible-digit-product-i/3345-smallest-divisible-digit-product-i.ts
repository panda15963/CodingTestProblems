/**
 * Finds the smallest number greater than or equal to n whose digit product is divisible by t
 * @param n - The starting number to search from
 * @param t - The target divisor for the digit product
 * @returns The smallest number >= n whose digit product is divisible by t
 */
function smallestNumber(n: number, t: number): number {
    // Iterate from n onwards until we find a valid number
    for (let currentNumber = n; ; currentNumber++) {
        // Calculate the product of all digits in currentNumber
        let digitProduct = 1;
        let tempNumber = currentNumber;
      
        // Extract each digit and multiply them together
        while (tempNumber > 0) {
            const lastDigit = tempNumber % 10;
            digitProduct *= lastDigit;
            tempNumber = Math.floor(tempNumber / 10);
        }
      
        // Check if the digit product is divisible by t
        if (digitProduct % t === 0) {
            return currentNumber;
        }
    }
}
