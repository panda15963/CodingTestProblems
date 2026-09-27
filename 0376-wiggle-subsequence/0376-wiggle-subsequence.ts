/**
 * Finds the length of the longest wiggle subsequence in the given array.
 * A wiggle sequence is one where differences between successive numbers strictly alternate between positive and negative.
 * 
 * @param nums - Input array of numbers
 * @returns The length of the longest wiggle subsequence
 */
function wiggleMaxLength(nums: number[]): number {
    const arrayLength: number = nums.length;
  
    // Dynamic programming array where upSequence[i] represents the length of the longest wiggle subsequence 
    // ending at index i with an upward trend (current element > previous element)
    const upSequence: number[] = Array(arrayLength).fill(1);
  
    // Dynamic programming array where downSequence[i] represents the length of the longest wiggle subsequence 
    // ending at index i with a downward trend (current element < previous element)
    const downSequence: number[] = Array(arrayLength).fill(1);
  
    // Track the maximum length found so far
    let maxLength: number = 1;
  
    // Iterate through each position in the array
    for (let currentIndex: number = 1; currentIndex < arrayLength; ++currentIndex) {
        // Check all previous positions to build the wiggle sequence
        for (let previousIndex: number = 0; previousIndex < currentIndex; ++previousIndex) {
            // If current element is greater than previous, we can extend a down sequence
            if (nums[currentIndex] > nums[previousIndex]) {
                upSequence[currentIndex] = Math.max(upSequence[currentIndex], downSequence[previousIndex] + 1);
            } 
            // If current element is less than previous, we can extend an up sequence
            else if (nums[currentIndex] < nums[previousIndex]) {
                downSequence[currentIndex] = Math.max(downSequence[currentIndex], upSequence[previousIndex] + 1);
            }
        }
      
        // Update the maximum length considering both up and down sequences ending at current position
        maxLength = Math.max(maxLength, upSequence[currentIndex], downSequence[currentIndex]);
    }
  
    return maxLength;
}
