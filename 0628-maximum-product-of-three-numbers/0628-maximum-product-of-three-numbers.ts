/**
 * Finds the maximum product of three numbers in an array
 * @param nums - Array of integers
 * @returns Maximum product of any three numbers
 */
function maximumProduct(nums: number[]): number {
    // Sort the array in ascending order
    nums.sort((a: number, b: number) => a - b);
  
    // Get the length of the sorted array
    const arrayLength: number = nums.length;
  
    // Calculate product of three largest numbers
    // This handles the case where all numbers are positive or mostly positive
    const productOfThreeLargest: number = nums[arrayLength - 1] * nums[arrayLength - 2] * nums[arrayLength - 3];
  
    // Calculate product of two smallest numbers and the largest number
    // This handles the case where we have negative numbers that become positive when multiplied
    const productOfTwoSmallestAndLargest: number = nums[arrayLength - 1] * nums[0] * nums[1];
  
    // Return the maximum of the two possible products
    return Math.max(productOfThreeLargest, productOfTwoSmallestAndLargest);
}
