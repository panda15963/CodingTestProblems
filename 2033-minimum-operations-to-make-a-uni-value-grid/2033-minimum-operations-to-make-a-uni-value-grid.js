/**
 * Calculates the minimum number of operations to make all elements in a grid equal
 * Each operation adds or subtracts x from an element
 * @param {number[][]} grid - 2D array of numbers to be equalized
 * @param {number} x - The value to add or subtract in each operation
 * @returns {number} The minimum number of operations, or -1 if impossible
 */
function minOperations(grid, x) {
    // Flatten the 2D grid into a 1D array
    const flattenedArray = grid.flat();
    
    // First check if all elements have same remainder modulo x
    const firstRemainder = flattenedArray[0] % x;
    for (const val of flattenedArray) {
        if (val % x !== firstRemainder) {
            return -1;
        }
    }
  
    // Sort the array in ascending order to find the median
    flattenedArray.sort((a, b) => a - b);
  
    // Find the median value (middle element for optimal operations)
    const medianValue = flattenedArray[Math.floor(flattenedArray.length / 2)];
  
    // Initialize counter for total operations needed
    let totalOperations = 0;
  
    // Iterate through each value in the flattened array
    for (const currentValue of flattenedArray) {
        // Calculate the number of operations needed to reach the median
        const operationCount = Math.abs(currentValue - medianValue) / x;
      
        // Since we checked modulo x already, it should always be integer
        totalOperations += operationCount;
    }
  
    return totalOperations;
}