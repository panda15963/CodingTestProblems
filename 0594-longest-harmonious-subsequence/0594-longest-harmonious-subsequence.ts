/**
 * Find the longest harmonious subsequence in an array
 * A harmonious subsequence is one where the difference between max and min elements is exactly 1
 * @param nums - The input array of numbers
 * @returns The length of the longest harmonious subsequence
 */
function findLHS(nums: number[]): number {
    // Create a frequency map to count occurrences of each number
    const frequencyMap: Record<number, number> = {};
  
    // Count the frequency of each number in the array
    for (const num of nums) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
  
    // Track the maximum length of harmonious subsequence
    let maxLength = 0;
  
    // Iterate through each unique number and its frequency
    for (const [numStr, frequency] of Object.entries(frequencyMap)) {
        // Convert string key back to number and calculate the next consecutive number
        const currentNum = Number(numStr);
        const nextNum = currentNum + 1;
      
        // Check if the next consecutive number exists in the frequency map
        if (frequencyMap[nextNum]) {
            // Update max length with sum of current and next number frequencies
            maxLength = Math.max(maxLength, frequency + frequencyMap[nextNum]);
        }
    }
  
    return maxLength;
}
