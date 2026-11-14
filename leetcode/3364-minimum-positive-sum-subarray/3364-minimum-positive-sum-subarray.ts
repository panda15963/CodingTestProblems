/**
 * Finds the minimum sum of a subarray with length between l and r (inclusive) that has a positive sum.
 * @param nums - The input array of numbers
 * @param l - The minimum length of the subarray
 * @param r - The maximum length of the subarray
 * @returns The minimum positive sum of a valid subarray, or -1 if no such subarray exists
 */
function minimumSumSubarray(nums: number[], l: number, r: number): number {
    const arrayLength: number = nums.length;
    let minimumSum: number = Infinity;
  
    // Iterate through all possible starting positions
    for (let startIndex: number = 0; startIndex < arrayLength; startIndex++) {
        let currentSum: number = 0;
      
        // Extend the subarray from the current starting position
        for (let endIndex: number = startIndex; endIndex < arrayLength; endIndex++) {
            currentSum += nums[endIndex];
            const subarrayLength: number = endIndex - startIndex + 1;
          
            // Check if the subarray meets the length constraints and has a positive sum
            if (subarrayLength >= l && subarrayLength <= r && currentSum > 0) {
                minimumSum = Math.min(minimumSum, currentSum);
            }
        }
    }
  
    // Return -1 if no valid subarray was found, otherwise return the minimum sum
    return minimumSum === Infinity ? -1 : minimumSum;
}
