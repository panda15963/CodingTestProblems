class Solution {
    public int minPatches(int[] nums, int n) {
        // maxReachableSum represents the maximum sum we can form using current elements
        // We can form all sums in range [1, maxReachableSum - 1]
        long maxReachableSum = 1;
      
        // Count of patches (new numbers) we need to add
        int patchCount = 0;
      
        // Index to traverse the nums array
        int index = 0;
      
        // Continue until we can form all sums up to n
        while (maxReachableSum <= n) {
            // Check if we can use the current element from nums array
            if (index < nums.length && nums[index] <= maxReachableSum) {
                // If current element is within our reachable range,
                // we can extend our range by adding this element
                maxReachableSum += nums[index];
                index++;
            } else {
                // If current element is too large or we've exhausted the array,
                // we need to add a patch (the optimal patch is maxReachableSum itself)
                patchCount++;
              
                // Adding maxReachableSum as a patch doubles our reachable range
                // This is equivalent to: maxReachableSum = maxReachableSum * 2
                maxReachableSum <<= 1;
            }
        }
      
        return patchCount;
    }
}
