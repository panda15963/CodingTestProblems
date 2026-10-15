/**
 * Calculates the sum of squares of distinct element counts for all subarrays
 * @param nums - Input array of numbers
 * @returns Sum of (distinct count)^2 for all subarrays
 */
function sumCounts(nums: number[]): number {
    let totalSum: number = 0;
    const arrayLength: number = nums.length;
  
    // Iterate through each starting position of subarrays
    for (let startIndex: number = 0; startIndex < arrayLength; startIndex++) {
        // Frequency array to track occurrences of each number (0-100 range)
        const frequencyMap: number[] = Array(101).fill(0);
        let distinctCount: number = 0;
      
        // Process all subarrays starting from startIndex
        for (let endIndex: number = startIndex; endIndex < arrayLength; endIndex++) {
            const currentElement: number = nums[endIndex];
          
            // Increment frequency and check if it's a new distinct element
            frequencyMap[currentElement]++;
            if (frequencyMap[currentElement] === 1) {
                distinctCount++;
            }
          
            // Add square of current distinct count to total sum
            totalSum += distinctCount * distinctCount;
        }
    }
  
    return totalSum;
}
