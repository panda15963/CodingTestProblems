/**
 * Calculates the sum of squares of distinct element counts for all subarrays.
 * @param {number[]} nums - Input array of numbers
 * @return {number} Sum of (distinct count)^2 for all subarrays
 */
function sumCounts(nums) {
    let totalSum = 0;
    const arrayLength = nums.length;

    // Iterate through each starting position of subarrays
    for (let startIndex = 0; startIndex < arrayLength; startIndex++) {
        // Track occurrences of each number (0-100 range)
        const frequencyMap = Array(101).fill(0);
        let distinctCount = 0;

        // Process all subarrays starting at startIndex
        for (let endIndex = startIndex; endIndex < arrayLength; endIndex++) {
            const currentElement = nums[endIndex];

            // Check if the element is newly encountered
            frequencyMap[currentElement]++;
            if (frequencyMap[currentElement] === 1) {
                distinctCount++;
            }

            // Add the square of the distinct count
            totalSum += distinctCount * distinctCount;
        }
    }

    return totalSum;
}