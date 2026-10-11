/**
 * Calculates the sum of squares of elements at special positions.
 * A position i is special if (i + 1) is a divisor of the array length n.
 * 
 * @param nums - The input array of numbers
 * @returns The sum of squares of elements at special positions
 */
function sumOfSquares(nums: number[]): number {
    // Get the length of the input array
    const arrayLength: number = nums.length;
  
    // Initialize the sum accumulator
    let sumOfSquaresResult: number = 0;
  
    // Iterate through each element in the array
    for (let index: number = 0; index < arrayLength; index++) {
        // Check if current position (index + 1) is a divisor of array length
        // Note: We use (index + 1) because positions are 1-indexed in this problem
        if (arrayLength % (index + 1) === 0) {
            // If it's a special position, add the square of the element to the sum
            sumOfSquaresResult += nums[index] * nums[index];
        }
    }
  
    // Return the final sum of squares
    return sumOfSquaresResult;
}
