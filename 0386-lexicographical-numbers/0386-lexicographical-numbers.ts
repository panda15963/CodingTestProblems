/**
 * Generates numbers from 1 to n in lexicographical order
 * @param n - The upper bound of numbers to generate
 * @returns An array of numbers in lexicographical order
 */
function lexicalOrder(n: number): number[] {
    const result: number[] = [];
    let currentNumber: number = 1;
  
    // Generate exactly n numbers
    for (let i = 0; i < n; i++) {
        // Add current number to result
        result.push(currentNumber);
      
        // Try to go deeper in the tree (multiply by 10)
        if (currentNumber * 10 <= n) {
            currentNumber *= 10;
        } else {
            // Can't go deeper, need to move to next sibling or backtrack
          
            // Backtrack if we're at a leaf node (ends with 9) or reached the boundary (n)
            while (currentNumber % 10 === 9 || currentNumber === n) {
                currentNumber = Math.floor(currentNumber / 10);
            }
          
            // Move to next sibling
            currentNumber++;
        }
    }
  
    return result;
}
