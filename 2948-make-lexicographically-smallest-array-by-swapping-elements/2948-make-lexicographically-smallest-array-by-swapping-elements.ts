/**
 * Returns the lexicographically smallest array by swapping elements within a limit constraint.
 * Elements can be swapped if their absolute difference is at most the given limit.
 * 
 * @param nums - The input array of numbers
 * @param limit - The maximum allowed difference between elements that can be swapped
 * @returns The lexicographically smallest array after allowed swaps
 */
function lexicographicallySmallestArray(nums: number[], limit: number): number[] {
    const arrayLength: number = nums.length;
  
    // Create an array of indices [0, 1, 2, ..., n-1]
    const indices: number[] = Array.from({ length: arrayLength }, (_, index) => index);
  
    // Sort indices based on their corresponding values in nums (ascending order)
    indices.sort((indexA: number, indexB: number) => nums[indexA] - nums[indexB]);
  
    // Initialize result array with zeros
    const result: number[] = Array(arrayLength).fill(0);
  
    // Process groups of elements that can be swapped with each other
    let currentIndex: number = 0;
    while (currentIndex < arrayLength) {
        // Find the end of current group where consecutive sorted elements differ by at most 'limit'
        let groupEndIndex: number = currentIndex + 1;
        while (groupEndIndex < arrayLength && 
               nums[indices[groupEndIndex]] - nums[indices[groupEndIndex - 1]] <= limit) {
            groupEndIndex++;
        }
      
        // Extract indices of current group and sort them by position (ascending order)
        const sortedGroupIndices: number[] = indices
            .slice(currentIndex, groupEndIndex)
            .sort((a: number, b: number) => a - b);
      
        // Assign the sorted values to their optimal positions
        // Place smallest available values at leftmost available positions
        for (let k: number = currentIndex; k < groupEndIndex; k++) {
            result[sortedGroupIndices[k - currentIndex]] = nums[indices[k]];
        }
      
        // Move to the next group
        currentIndex = groupEndIndex;
    }
  
    return result;
}
