/**
 * Finds the minimum number of moves to make all pairs sum to the same value
 * @param nums - Array of integers
 * @param limit - Maximum value any element can be changed to (1 to limit)
 * @returns Minimum number of moves required
 */
function minMoves(nums: number[], limit: number): number {
    const arrayLength: number = nums.length;
  
    // Difference array to track cost changes at different sum values
    // Size is 2*limit+2 to handle all possible sums (2 to 2*limit)
    const differenceArray: number[] = Array(limit * 2 + 2).fill(0);
  
    // Process each pair from both ends of the array
    for (let i = 0; i < arrayLength >> 1; ++i) {
        // Get the pair elements from opposite ends
        const minValue: number = Math.min(nums[i], nums[arrayLength - 1 - i]);
        const maxValue: number = Math.max(nums[i], nums[arrayLength - 1 - i]);
      
        // Build difference array using range updates:
        // [2, minValue]: requires 2 moves (both elements need to change)
        differenceArray[2] += 2;
        differenceArray[minValue + 1] -= 2;
      
        // [minValue+1, minValue+maxValue-1]: requires 1 move (change larger element)
        differenceArray[minValue + 1] += 1;
        differenceArray[minValue + maxValue] -= 1;
      
        // [minValue+maxValue, minValue+maxValue]: requires 0 moves (already sum to this)
        // No update needed as the net change is 0
      
        // [minValue+maxValue+1, maxValue+limit]: requires 1 move (change smaller element)
        differenceArray[minValue + maxValue + 1] += 1;
        differenceArray[maxValue + limit + 1] -= 1;
      
        // [maxValue+limit+1, 2*limit]: requires 2 moves (both elements need to change)
        differenceArray[maxValue + limit + 1] += 2;
    }
  
    // Find the minimum cost by computing prefix sum
    let minMoves: number = arrayLength;
    let currentCost: number = 0;
  
    // Calculate actual costs from difference array and find minimum
    for (let targetSum = 2; targetSum < differenceArray.length; ++targetSum) {
        currentCost += differenceArray[targetSum];
        minMoves = Math.min(minMoves, currentCost);
    }
  
    return minMoves;
}