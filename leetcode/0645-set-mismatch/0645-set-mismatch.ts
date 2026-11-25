/**
 * Finds the duplicate number and missing number in an array containing numbers from 1 to n
 * @param nums - Array containing numbers from 1 to n with one duplicate and one missing
 * @returns Array with [duplicate, missing] numbers
 */
function findErrorNums(nums: number[]): number[] {
    // Get the length of the input array
    const arrayLength: number = nums.length;
  
    // Calculate the expected sum of numbers from 1 to n using formula: n * (n + 1) / 2
    const expectedSum: number = (arrayLength * (arrayLength + 1)) >> 1;
  
    // Calculate the sum of unique elements by removing duplicates using Set
    const uniqueElementsSum: number = [...new Set(nums)].reduce((accumulator, current) => accumulator + current, 0);
  
    // Calculate the actual sum of all elements in the array (including duplicate)
    const actualSum: number = nums.reduce((accumulator, current) => accumulator + current, 0);
  
    // The duplicate number is: actualSum - uniqueElementsSum
    // The missing number is: expectedSum - uniqueElementsSum
    return [actualSum - uniqueElementsSum, expectedSum - uniqueElementsSum];
}
