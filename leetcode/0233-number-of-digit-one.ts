/**
 * Counts the total number of digit 1 appearing in all non-negative integers from 0 to n
 * Uses digit dynamic programming approach
 * @param n - The upper bound integer
 * @returns The count of digit 1 in all numbers from 0 to n
 */
function countDigitOne(n: number): number {
    // Convert number to string for digit-by-digit processing
    const numberString: string = n.toString();
    const digitCount: number = numberString.length;
  
    // Memoization table: memo[position][count of ones so far]
    // -1 indicates uncomputed state
    const memo: number[][] = Array.from(
        { length: digitCount }, 
        () => Array(digitCount).fill(-1)
    );
  
    /**
     * Depth-first search to count digit 1 occurrences
     * @param position - Current digit position being processed (0-indexed from left)
     * @param onesCount - Count of digit 1 encountered so far
     * @param isLimit - Whether we're still bounded by the original number's digits
     * @returns Total count of digit 1 for all valid numbers from current state
     */
    const dfs = (position: number, onesCount: number, isLimit: boolean): number => {
        // Base case: reached the end of all digits
        if (position >= digitCount) {
            return onesCount;
        }
      
        // Check memoization table if not constrained by limit
        if (!isLimit && memo[position][onesCount] !== -1) {
            return memo[position][onesCount];
        }
      
        // Determine the maximum digit we can place at current position
        const maxDigit: number = isLimit ? parseInt(numberString[position]) : 9;
      
        // Try all possible digits from 0 to maxDigit
        let totalCount: number = 0;
        for (let digit = 0; digit <= maxDigit; digit++) {
            // Recursively process next position
            // Update onesCount if current digit is 1
            // Update isLimit: remains true only if we're at limit AND chose maxDigit
            totalCount += dfs(
                position + 1, 
                onesCount + (digit === 1 ? 1 : 0), 
                isLimit && digit === maxDigit
            );
        }
      
        // Store result in memoization table if not limited
        if (!isLimit) {
            memo[position][onesCount] = totalCount;
        }
      
        return totalCount;
    };
  
    // Start DFS from position 0, with 0 ones counted, and limit flag true
    return dfs(0, 0, true);
}
