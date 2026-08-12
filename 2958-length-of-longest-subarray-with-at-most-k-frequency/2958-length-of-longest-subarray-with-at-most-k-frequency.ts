/**
 * Finds the maximum length of a subarray where no element appears more than k times
 * @param nums - The input array of numbers
 * @param k - The maximum frequency allowed for any element in the subarray
 * @returns The length of the longest valid subarray
 */
function maxSubarrayLength(nums: number[], k: number): number {
    // Map to track the frequency of each element in the current window
    const frequencyMap: Map<number, number> = new Map<number, number>();
  
    // Variable to store the maximum subarray length found
    let maxLength: number = 0;
  
    // Use two pointers to maintain a sliding window
    let leftPointer: number = 0;
  
    for (let rightPointer: number = 0; rightPointer < nums.length; rightPointer++) {
        // Add current element to the window and update its frequency
        const currentElement: number = nums[rightPointer];
        const currentFrequency: number = frequencyMap.get(currentElement) ?? 0;
        frequencyMap.set(currentElement, currentFrequency + 1);
      
        // Shrink the window from the left while the current element's frequency exceeds k
        while (frequencyMap.get(currentElement)! > k) {
            // Remove the leftmost element from the window
            const leftElement: number = nums[leftPointer];
            const leftFrequency: number = frequencyMap.get(leftElement)!;
            frequencyMap.set(leftElement, leftFrequency - 1);
          
            // Move the left pointer forward
            leftPointer++;
        }
      
        // Update the maximum length with the current valid window size
        const currentWindowSize: number = rightPointer - leftPointer + 1;
        maxLength = Math.max(maxLength, currentWindowSize);
    }
  
    return maxLength;
}