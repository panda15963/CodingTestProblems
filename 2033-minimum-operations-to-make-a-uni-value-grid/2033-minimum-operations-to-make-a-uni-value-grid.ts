/**
 * Calculates the minimum number of operations to make all elements in a grid equal
 * Each operation adds or subtracts x from an element
 * @param grid - 2D array of numbers to be equalized
 * @param x - The value to add or subtract in each operation
 * @returns The minimum number of operations, or -1 if impossible
 */
function minOperations(grid: number[][], x: number): number {
    // Flatten the 2D grid into a 1D array
    const flattenedArray: number[] = grid.flat();
  
    // Sort the array in ascending order to find the median
    flattenedArray.sort((a: number, b: number) => a - b);
  
    // Find the median value (middle element for optimal operations)
    const medianValue: number = flattenedArray[Math.floor(flattenedArray.length / 2)];
  
    // Initialize counter for total operations needed
    let totalOperations: number = 0;
  
    // Iterate through each value in the flattened array
    for (const currentValue of flattenedArray) {
        // Calculate the number of operations needed to reach the median
        const operationCount: number = Math.abs(currentValue - medianValue) / x;
      
        // Check if the difference is divisible by x (integer operations only)
        // Using bitwise OR with 0 to check if it's an integer
        if (operationCount !== Math.floor(operationCount)) {
            return -1; // Impossible to make all elements equal
        }
      
        // Add the operations for this element to the total
        totalOperations += operationCount;
    }
  
    return totalOperations;
}