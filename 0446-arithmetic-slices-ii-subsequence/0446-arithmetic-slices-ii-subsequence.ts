/**
 * Counts the number of arithmetic subsequences of length >= 3 in the given array
 * An arithmetic subsequence is a sequence where the difference between consecutive elements is constant
 * 
 * @param nums - The input array of numbers
 * @returns The total count of arithmetic subsequences
 */
function numberOfArithmeticSlices(nums: number[]): number {
    const arrayLength: number = nums.length;
  
    // dp[i] is a map where:
    // - key: the common difference
    // - value: count of arithmetic subsequences ending at index i with this difference
    const dp: Map<number, number>[] = new Array(arrayLength)
        .fill(0)
        .map(() => new Map<number, number>());
  
    let totalCount: number = 0;
  
    // Iterate through each position as potential end of subsequence
    for (let currentIndex = 0; currentIndex < arrayLength; ++currentIndex) {
        // Check all previous elements as potential second-to-last element
        for (let previousIndex = 0; previousIndex < currentIndex; ++previousIndex) {
            // Calculate the common difference between current and previous element
            const difference: number = nums[currentIndex] - nums[previousIndex];
          
            // Get count of subsequences ending at previousIndex with this difference
            // These can be extended by adding current element
            const previousSubsequenceCount: number = dp[previousIndex].get(difference) || 0;
          
            // Add all extendable subsequences to total
            // (they become valid arithmetic subsequences of length >= 3)
            totalCount += previousSubsequenceCount;
          
            // Update dp for current position:
            // 1. Add all extended subsequences from previousIndex
            // 2. Add 1 for new two-element subsequence [nums[previousIndex], nums[currentIndex]]
            const currentCount: number = dp[currentIndex].get(difference) || 0;
            dp[currentIndex].set(difference, currentCount + previousSubsequenceCount + 1);
        }
    }
  
    return totalCount;
}
