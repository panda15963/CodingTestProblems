/**
 * Finds the k-th smallest number in lexicographical order from 1 to n
 * @param n - The upper bound of the range [1, n]
 * @param k - The position of the number to find (1-indexed)
 * @returns The k-th smallest number in lexicographical order
 */
function findKthNumber(n: number, k: number): number {
    /**
     * Counts how many numbers exist in the subtree rooted at currentPrefix
     * within the range [1, n] in lexicographical order
     * @param currentPrefix - The current prefix to count from
     * @returns The count of numbers in the subtree
     */
    function countNumbersInSubtree(currentPrefix: number): number {
        let nextPrefix: number = currentPrefix + 1;
        let count: number = 0;
      
        // Count numbers level by level in the lexicographical tree
        while (currentPrefix <= n) {
            // Add the count of valid numbers at this level
            // Either all numbers from currentPrefix to nextPrefix-1, 
            // or limited by n if n is smaller
            count += Math.min(n - currentPrefix + 1, nextPrefix - currentPrefix);
          
            // Move to the next level (append a digit)
            currentPrefix *= 10;
            nextPrefix *= 10;
        }
      
        return count;
    }

    let currentNumber: number = 1;
    // Decrement k since we start from the first number
    k--;

    // Navigate through the lexicographical tree to find the k-th number
    while (k > 0) {
        // Count how many numbers are in the subtree rooted at currentNumber
        const subtreeCount: number = countNumbersInSubtree(currentNumber);
      
        if (k >= subtreeCount) {
            // Skip the entire subtree and move to the next sibling
            k -= subtreeCount;
            currentNumber += 1;
        } else {
            // The target is within this subtree, go deeper
            k -= 1;
            currentNumber *= 10;
        }
    }

    return currentNumber;
}
