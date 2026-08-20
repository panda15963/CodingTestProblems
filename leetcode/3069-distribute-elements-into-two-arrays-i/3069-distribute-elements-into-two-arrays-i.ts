/**
 * Splits an array into two subarrays based on comparison of their last elements,
 * then concatenates them back together.
 * @param nums - The input array of numbers to process
 * @returns The concatenated result of the two subarrays
 */
function resultArray(nums: number[]): number[] {
    // Initialize first subarray with the first element
    const firstArray: number[] = [nums[0]];
  
    // Initialize second subarray with the second element
    const secondArray: number[] = [nums[1]];
  
    // Process remaining elements starting from index 2
    for (const currentElement of nums.slice(2)) {
        // Get the last element of each subarray
        const lastElementFirst = firstArray[firstArray.length - 1];
        const lastElementSecond = secondArray[secondArray.length - 1];
      
        // Add current element to the subarray with larger last element
        if (lastElementFirst > lastElementSecond) {
            firstArray.push(currentElement);
        } else {
            secondArray.push(currentElement);
        }
    }
  
    // Concatenate both subarrays and return the result
    return firstArray.concat(secondArray);
}
