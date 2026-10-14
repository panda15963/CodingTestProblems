function findDuplicates(nums: number[]): number[] {
    const n: number = nums.length;
  
    // Place each number at its correct position (index = value - 1)
    // Numbers in range [1, n] should be at positions [0, n-1]
    for (let i = 0; i < n; i++) {
        // Keep swapping current element to its correct position
        // until current position has the right element or a duplicate
        while (nums[i] !== nums[nums[i] - 1]) {
            // Swap nums[i] with nums[nums[i] - 1]
            const targetIndex: number = nums[i] - 1;
            const temp: number = nums[i];
            nums[i] = nums[targetIndex];
            nums[targetIndex] = temp;
        }
    }
  
    // Collect all duplicates
    // Elements not at their correct positions are duplicates
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
        // If element at index i is not i+1, it's a duplicate
        if (nums[i] !== i + 1) {
            result.push(nums[i]);
        }
    }
  
    return result;
}
