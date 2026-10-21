/**
 * Finds the minimum number of moves to make all array elements equal,
 * where a move consists of incrementing or decrementing an element by 1.
 * Uses the median as the optimal meeting point.
 * 
 * @param nums - Array of integers to be equalized
 * @returns The minimum number of moves required
 */
function minMoves2(nums: number[]): number {
    // Sort the array in ascending order to find the median
    nums.sort((a: number, b: number) => a - b);
  
    // Find the median value (middle element for optimal moves)
    // Using bit shift for integer division by 2
    const medianValue: number = nums[nums.length >> 1];
  
    // Calculate total moves by summing absolute differences from median
    const totalMoves: number = nums.reduce(
        (accumulator: number, currentValue: number) => {
            return accumulator + Math.abs(currentValue - medianValue);
        }, 
        0
    );
  
    return totalMoves;
}
