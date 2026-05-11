/**
 * Separates each number in the array into its individual digits
 * @param nums - Array of positive integers to separate
 * @returns Array containing all digits from all numbers in order
 */
function separateDigits(nums: number[]): number[] {
    const result: number[] = [];
  
    // Process each number in the input array
    for (const currentNumber of nums) {
        const digits: number[] = [];
        let remainingNumber = currentNumber;
      
        // Extract digits from right to left using modulo operation
        while (remainingNumber > 0) {
            // Get the rightmost digit
            digits.push(remainingNumber % 10);
            // Remove the rightmost digit
            remainingNumber = Math.floor(remainingNumber / 10);
        }
      
        // Reverse to get digits in correct order (left to right) and add to result
        result.push(...digits.reverse());
    }
  
    return result;
}