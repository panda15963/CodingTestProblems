/**
 * Finds the maximum length of a valid subset where elements form a geometric sequence
 * with common ratio being the square of the previous element
 * @param nums - Array of positive integers
 * @returns Maximum length of valid subset
 */
function maximumLength(nums: number[]): number {
    // Count frequency of each number in the array
    const frequencyMap: Map<number, number> = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) ?? 0) + 1);
    }
  
    // Handle special case for 1s (1^2 = 1, so they form their own sequence)
    // For odd count of 1s, use all; for even count, use count-1 to ensure odd length
    let maxLength = frequencyMap.has(1) 
        ? frequencyMap.get(1)! - (frequencyMap.get(1)! % 2 ^ 1) 
        : 0;
    frequencyMap.delete(1);
  
    // Check each unique number as potential start of a geometric sequence
    for (const [startNum, _] of frequencyMap) {
        let currentNum = startNum;
        let sequenceLength = 0;
      
        // Build sequence by squaring: x, x^2, x^4, x^8, ...
        // Each intermediate element needs to appear at least twice (to continue and return)
        while (frequencyMap.has(currentNum) && frequencyMap.get(currentNum)! > 1) {
            currentNum = currentNum * currentNum;
            sequenceLength += 2; // Add 2 for the pair (going up and coming back)
        }
      
        // Add 1 if the final element exists (peak of sequence), otherwise subtract 1
        sequenceLength += frequencyMap.has(currentNum) ? 1 : -1;
      
        // Update maximum length found so far
        maxLength = Math.max(maxLength, sequenceLength);
    }
  
    return maxLength;
}