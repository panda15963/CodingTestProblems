/**
 * Calculates the minimum number of patches required to form every integer in range [1, n]
 * @param nums - Sorted array of positive integers
 * @param n - Target upper bound of the range
 * @returns Minimum number of patches needed
 */
function minPatches(nums: number[], n: number): number {
    // The smallest number that cannot be formed with current elements
    let smallestMissing: number = 1;
  
    // Count of patches added
    let patchCount: number = 0;
  
    // Index for traversing the nums array
    let index: number = 0;
  
    // Continue until we can form all numbers up to n
    while (smallestMissing <= n) {
        if (index < nums.length && nums[index] <= smallestMissing) {
            // If current number can help extend our range, use it
            // We can now form all numbers up to (smallestMissing + nums[index] - 1)
            smallestMissing += nums[index];
            index++;
        } else {
            // Need to patch: add smallestMissing itself
            // This doubles our reachable range
            patchCount++;
            smallestMissing *= 2;
        }
    }
  
    return patchCount;
}
