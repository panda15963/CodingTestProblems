/**
 * Finds the maximum distance between any two elements from different arrays
 * @param arrays - A list of sorted arrays (each array is sorted in ascending order)
 * @returns The maximum distance between elements from different arrays
 */
function maxDistance(arrays: number[][]): number {
    // Initialize the maximum distance result
    let maxDistanceResult: number = 0;
  
    // Track the minimum value from all arrays seen so far
    let minValue: number = arrays[0][0];
    // Track the maximum value from all arrays seen so far
    let maxValue: number = arrays[0][arrays[0].length - 1];
  
    // Iterate through remaining arrays starting from index 1
    for (let i = 1; i < arrays.length; i++) {
        const currentArray: number[] = arrays[i];
      
        // Calculate distance between current array's minimum and previous maximum
        const distanceToMax: number = Math.abs(currentArray[0] - maxValue);
      
        // Calculate distance between current array's maximum and previous minimum
        const distanceToMin: number = Math.abs(currentArray[currentArray.length - 1] - minValue);
      
        // Update maximum distance if a larger distance is found
        maxDistanceResult = Math.max(maxDistanceResult, distanceToMax, distanceToMin);
      
        // Update global minimum value
        minValue = Math.min(minValue, currentArray[0]);
      
        // Update global maximum value
        maxValue = Math.max(maxValue, currentArray[currentArray.length - 1]);
    }
  
    return maxDistanceResult;
}
