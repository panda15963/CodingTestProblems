/**
 * Finds the minimum distance between the start index and any occurrence of the target value in the array
 * @param nums - The input array of numbers
 * @param target - The target value to search for
 * @param start - The starting index to calculate distance from
 * @returns The minimum absolute distance between start and any index where target appears
 */
function getMinDistance(nums: number[], target: number, start: number): number {
    // Initialize minimum distance to infinity
    let minDistance: number = Infinity;
  
    // Iterate through each element in the array
    for (let i: number = 0; i < nums.length; i++) {
        // Check if current element equals the target
        if (nums[i] === target) {
            // Update minimum distance if current distance is smaller
            minDistance = Math.min(minDistance, Math.abs(i - start));
        }
    }
  
    // Return the minimum distance found
    return minDistance;
}