/**
 * Finds the largest subset where every pair of elements (a, b) satisfies either a % b = 0 or b % a = 0
 * @param nums - Array of positive integers
 * @returns The largest divisible subset
 */
function largestDivisibleSubset(nums: number[]): number[] {
    // Sort the array in ascending order to ensure smaller elements come before larger ones
    nums.sort((a, b) => a - b);
  
    const arrayLength: number = nums.length;
  
    // Dynamic programming array where dp[i] represents the size of largest subset ending at index i
    const dp: number[] = Array(arrayLength).fill(1);
  
    // Track the index of the element that forms the largest subset
    let maxSubsetIndex: number = 0;

    // Build up the dp array
    for (let currentIndex = 0; currentIndex < arrayLength; ++currentIndex) {
        // Check all previous elements that could form a subset with current element
        for (let previousIndex = 0; previousIndex < currentIndex; ++previousIndex) {
            // If current element is divisible by previous element, they can be in same subset
            if (nums[currentIndex] % nums[previousIndex] === 0) {
                dp[currentIndex] = Math.max(dp[currentIndex], dp[previousIndex] + 1);
            }
        }
      
        // Update the index of maximum subset if current subset is larger
        if (dp[maxSubsetIndex] < dp[currentIndex]) {
            maxSubsetIndex = currentIndex;
        }
    }

    // Reconstruct the actual subset from the dp array
    let remainingElements: number = dp[maxSubsetIndex];
    const result: number[] = [];
  
    // Backtrack from the largest element to build the subset
    for (let index = maxSubsetIndex; remainingElements > 0; --index) {
        // Check if current element can be part of the subset chain
        if (nums[maxSubsetIndex] % nums[index] === 0 && dp[index] === remainingElements) {
            result.push(nums[index]);
            maxSubsetIndex = index;
            --remainingElements;
        }
    }

    return result;
}
