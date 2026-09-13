function removeInvalidParentheses(s: string): string[] {
    const result: Set<string> = new Set();  // Store unique valid results
    let leftToRemove = 0;                   // Count of '(' to remove
    let rightToRemove = 0;                  // Count of ')' to remove
    const n = s.length;
  
    // First pass: calculate minimum number of parentheses to remove
    for (const char of s) {
        if (char === '(') {
            leftToRemove++;
        } else if (char === ')') {
            if (leftToRemove > 0) {
                leftToRemove--;      // Found matching '(' for this ')'
            } else {
                rightToRemove++;     // Extra ')' that needs to be removed
            }
        }
    }
  
    // DFS function to explore all possible valid combinations
    const dfs = (
        index: number,           // Current position in string
        leftRem: number,         // Remaining '(' to remove
        rightRem: number,        // Remaining ')' to remove
        leftCount: number,       // Count of '(' in current string
        rightCount: number,      // Count of ')' in current string
        current: string          // Current string being built
    ): void => {
        // Base case: reached end of string
        if (index === n) {
            // Check if we've removed all invalid parentheses
            if (leftRem === 0 && rightRem === 0) {
                result.add(current);
            }
            return;
        }
      
        // Pruning conditions:
        // 1. Not enough characters left to remove required parentheses
        // 2. More ')' than '(' at any point (invalid state)
        if (n - index < leftRem + rightRem || leftCount < rightCount) {
            return;
        }
      
        // Option 1: Remove current '(' if we still need to remove left parentheses
        if (s[index] === '(' && leftRem > 0) {
            dfs(index + 1, leftRem - 1, rightRem, leftCount, rightCount, current);
        }
      
        // Option 2: Remove current ')' if we still need to remove right parentheses
        if (s[index] === ')' && rightRem > 0) {
            dfs(index + 1, leftRem, rightRem - 1, leftCount, rightCount, current);
        }
      
        // Option 3: Keep current character
        const addLeft = s[index] === '(' ? 1 : 0;
        const addRight = s[index] === ')' ? 1 : 0;
        dfs(index + 1, leftRem, rightRem, leftCount + addLeft, rightCount + addRight, current + s[index]);
    };
  
    // Start DFS from index 0
    dfs(0, leftToRemove, rightToRemove, 0, 0, "");
  
    // Convert set to array and return
    return Array.from(result);
}
