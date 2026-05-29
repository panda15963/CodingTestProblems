/**
 * Finds the minimum sum of digits among all numbers in the array
 * @param nums - Array of positive integers
 * @returns The minimum digit sum found
 */
function minElement(nums: number[]): number {
    // Initialize minimum digit sum to a large value (100)
    let minimumDigitSum: number = 100;
  
    // Iterate through each number in the array
    for (const currentNumber of nums) {
        // Calculate the sum of digits for the current number
        let digitSum: number = 0;
        let tempNumber: number = currentNumber;
      
        // Extract and sum each digit by repeatedly dividing by 10
        while (tempNumber > 0) {
            // Add the last digit (remainder when divided by 10)
            digitSum += tempNumber % 10;
            // Remove the last digit by integer division
            tempNumber = Math.floor(tempNumber / 10);
        }
      
        // Update the minimum digit sum if current sum is smaller
        minimumDigitSum = Math.min(minimumDigitSum, digitSum);
    }
  
    // Return the minimum digit sum found
    return minimumDigitSum;
}