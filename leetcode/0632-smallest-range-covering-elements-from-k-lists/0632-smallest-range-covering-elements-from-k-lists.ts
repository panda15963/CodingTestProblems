function smallestRange(nums: number[][]): number[] {
    // Calculate total number of elements across all lists
    let totalElements = 0;
    for (const list of nums) {
        totalElements += list.length;
    }
  
    // Create array of [value, listIndex] pairs for all elements
    const elements: [number, number][] = new Array(totalElements);
    const numLists = nums.length;
  
    // Populate the elements array with all values and their corresponding list indices
    let index = 0;
    for (let listIdx = 0; listIdx < numLists; listIdx++) {
        for (const value of nums[listIdx]) {
            elements[index++] = [value, listIdx];
        }
    }
  
    // Sort elements by value (ascending order)
    elements.sort((a, b) => a[0] - b[0]);
  
    // Sliding window approach to find the smallest range
    let left = 0;  // Left pointer of the window
    const listCount = new Map<number, number>();  // Count of elements from each list in current window
    let result: number[] = [-1000000, 1000000];  // Initialize with maximum possible range
  
    // Expand window with right pointer
    for (let right = 0; right < totalElements; right++) {
        const rightValue = elements[right][0];
        const rightListIdx = elements[right][1];
      
        // Add current element's list to the window
        listCount.set(rightListIdx, (listCount.get(rightListIdx) || 0) + 1);
      
        // Shrink window from left while it contains at least one element from each list
        while (listCount.size === numLists) {
            const leftValue = elements[left][0];
            const leftListIdx = elements[left][1];
          
            // Check if current range is smaller than the best found so far
            const rangeDiff = (rightValue - leftValue) - (result[1] - result[0]);
            if (rangeDiff < 0 || (rangeDiff === 0 && leftValue < result[0])) {
                // Update result with the new smaller range
                result[0] = leftValue;
                result[1] = rightValue;
            }
          
            // Remove leftmost element from window
            const newCount = listCount.get(leftListIdx)! - 1;
            if (newCount === 0) {
                listCount.delete(leftListIdx);
            } else {
                listCount.set(leftListIdx, newCount);
            }
            left++;
        }
    }
  
    return result;
}
