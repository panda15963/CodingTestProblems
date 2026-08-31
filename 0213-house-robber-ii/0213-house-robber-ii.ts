/**
 * House Robber II - Rob houses arranged in a circle
 * @param nums - Array representing money in each house
 * @returns Maximum amount of money that can be robbed
 */
function rob(nums: number[]): number {
    const houseCount: number = nums.length;
  
    // Edge case: only one house to rob
    if (houseCount === 1) {
        return nums[0];
    }
  
    /**
     * Helper function to rob houses in a linear range
     * Uses dynamic programming with space optimization
     * @param startIndex - Starting index of the range (inclusive)
     * @param endIndex - Ending index of the range (inclusive)
     * @returns Maximum money that can be robbed in the given range
     */
    const robLinearRange = (startIndex: number, endIndex: number): number => {
        // previousMax: max money when not robbing current house
        // currentMax: max money when robbing current house
        let previousMax: number = 0;
        let currentMax: number = 0;
      
        // Iterate through houses in the specified range
        for (let i: number = startIndex; i <= endIndex; i++) {
            // Store previous values before updating
            const tempPrevious: number = previousMax;
            const tempCurrent: number = currentMax;
          
            // Update states:
            // New previousMax = max of old previousMax and currentMax
            // New currentMax = old previousMax + current house value
            previousMax = Math.max(tempPrevious, tempCurrent);
            currentMax = tempPrevious + nums[i];
        }
      
        // Return the maximum of both states
        return Math.max(previousMax, currentMax);
    };
  
    // Since houses are in a circle, we cannot rob both first and last house
    // Solution: Take maximum of two scenarios:
    // 1. Rob houses from index 0 to n-2 (exclude last house)
    // 2. Rob houses from index 1 to n-1 (exclude first house)
    const robExcludingLast: number = robLinearRange(0, houseCount - 2);
    const robExcludingFirst: number = robLinearRange(1, houseCount - 1);
  
    return Math.max(robExcludingLast, robExcludingFirst);
}
