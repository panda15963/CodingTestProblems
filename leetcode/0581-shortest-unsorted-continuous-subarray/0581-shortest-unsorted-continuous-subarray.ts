/**
 * Finds the length of the shortest continuous subarray that, if sorted,
 * would make the entire array sorted in ascending order.
 * 
 * @param nums - The input array of numbers
 * @returns The length of the shortest unsorted subarray
 */
function findUnsortedSubarray(nums: number[]): number {
    // Create a sorted copy of the original array
    const sortedArray: number[] = [...nums];
    sortedArray.sort((a: number, b: number) => a - b);
  
    // Initialize left and right pointers to the array boundaries
    let leftIndex: number = 0;
    let rightIndex: number = sortedArray.length - 1;
  
    // Find the leftmost position where sorted and original arrays differ
    while (leftIndex <= rightIndex && sortedArray[leftIndex] === nums[leftIndex]) {
        leftIndex++;
    }
  
    // Find the rightmost position where sorted and original arrays differ
    while (leftIndex <= rightIndex && sortedArray[rightIndex] === nums[rightIndex]) {
        rightIndex--;
    }
  
    // Calculate the length of the unsorted subarray
    // If leftIndex > rightIndex, the array is already sorted (returns 0)
    return rightIndex - leftIndex + 1;
}
