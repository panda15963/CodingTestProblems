function distance(nums: number[]): number[] {
    const n = nums.length;
    const result: number[] = new Array(n).fill(0);
  
    // Group indices by their values
    const valueToIndices = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        if (!valueToIndices.has(nums[i])) {
            valueToIndices.set(nums[i], []);
        }
        valueToIndices.get(nums[i])!.push(i);
    }
  
    // Process each group of same values
    for (const [value, indices] of valueToIndices.entries()) {
        const groupSize = indices.length;
      
        // Initialize left and right sums for the first element in the group
        // leftSum: sum of distances from current position to all elements on its left
        let leftSum = 0;
        // rightSum: sum of distances from current position to all elements on its right
        // Initially, all other elements are on the right of the first element
        let rightSum = -groupSize * indices[0];
        for (const index of indices) {
            rightSum += index;
        }
      
        // Calculate distance sum for each element in the group
        for (let i = 0; i < groupSize; i++) {
            // Total distance is the sum of distances to left elements and right elements
            result[indices[i]] = leftSum + rightSum;
          
            // Update left and right sums for the next element
            if (i + 1 < groupSize) {
                const gap = indices[i + 1] - indices[i];
                // When moving to next element, all left elements (including current) 
                // will have their distances increased by the gap
                leftSum += gap * (i + 1);
                // All right elements will have their distances decreased by the gap
                rightSum -= gap * (groupSize - i - 1);
            }
        }
    }
  
    return result;
}