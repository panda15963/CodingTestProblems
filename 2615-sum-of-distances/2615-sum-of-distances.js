function distance(nums) {
    const n = nums.length;
    const result = new Array(n).fill(0);
  
    // Group indices by their values
    const valueToIndices = new Map();
    for (let i = 0; i < n; i++) {
        if (!valueToIndices.has(nums[i])) {
            valueToIndices.set(nums[i], []);
        }
        valueToIndices.get(nums[i]).push(i);
    }
  
    // Process each group of same values
    for (const [value, indices] of valueToIndices.entries()) {
        const groupSize = indices.length;
      
        // Initialize left and right sums for the first element in the group
        let leftSum = 0;
        let rightSum = -groupSize * indices[0];
        for (const index of indices) {
            rightSum += index;
        }
      
        // Calculate distance sum for each element in the group
        for (let i = 0; i < groupSize; i++) {
            result[indices[i]] = leftSum + rightSum;
          
            // Update left and right sums for the next element
            if (i + 1 < groupSize) {
                const gap = indices[i + 1] - indices[i];
                leftSum += gap * (i + 1);
                rightSum -= gap * (groupSize - i - 1);
            }
        }
    }
  
    return result;
}