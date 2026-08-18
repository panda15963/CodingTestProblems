/**
 * Finds the largest integer that appears exactly once in a subarray of length k
 * @param nums - The input array of numbers
 * @param k - The length of the subarray to consider
 * @returns The largest unique integer in the subarray, or -1 if none exists
 */
function largestInteger(nums: number[], k: number): number {
    // Special case: when k is 1, check each single element
    if (k === 1) {
        // Count frequency of each number in the array
        const frequencyMap = new Map<number, number>();
        for (const num of nums) {
            frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        }
      
        // Find the largest number that appears exactly once
        let maxUniqueNumber = -1;
        for (const [num, frequency] of frequencyMap.entries()) {
            if (frequency === 1 && num > maxUniqueNumber) {
                maxUniqueNumber = num;
            }
        }
        return maxUniqueNumber;
    }

    const arrayLength = nums.length;
  
    // Special case: when k equals array length, return the maximum value
    if (k === arrayLength) {
        return Math.max(...nums);
    }

    /**
     * Helper function to check if a number at given index is unique in the array
     * @param index - The index of the number to check
     * @returns The number if unique, -1 otherwise
     */
    const getUniqueNumberAtIndex = (index: number): number => {
        // Check if the number at index appears elsewhere in the array
        for (let i = 0; i < arrayLength; i++) {
            if (i !== index && nums[i] === nums[index]) {
                return -1; // Number is not unique
            }
        }
        return nums[index]; // Number is unique
    };

    // Check the first and last elements for uniqueness and return the maximum
    return Math.max(getUniqueNumberAtIndex(0), getUniqueNumberAtIndex(arrayLength - 1));
}
