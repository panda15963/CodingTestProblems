/**
 * Finds the minimum number of character changes needed to partition string s into k semi-palindromes
 * @param s - The input string to be partitioned
 * @param k - The number of partitions required
 * @returns The minimum number of changes needed
 */
function minimumChanges(s: string, k: number): number {
    const stringLength: number = s.length;
  
    // dp[i][j] stores minimum changes to make substring from index i to j a semi-palindrome
    const minChangesForSubstring: number[][] = Array.from(
        { length: stringLength + 1 }, 
        () => Array.from({ length: stringLength + 1 }, () => Infinity)
    );
  
    // dp[i][j] stores minimum changes to partition first i characters into j groups
    const minChangesForPartition: number[][] = Array.from(
        { length: stringLength + 1 }, 
        () => Array.from({ length: k + 1 }, () => Infinity)
    );
  
    // Base case: 0 characters with 0 partitions requires 0 changes
    minChangesForPartition[0][0] = 0;
  
    // Calculate minimum changes for each substring to become a semi-palindrome
    for (let startIdx: number = 1; startIdx <= stringLength; ++startIdx) {
        for (let endIdx: number = 1; endIdx <= stringLength; ++endIdx) {
            const substringLength: number = endIdx - startIdx + 1;
          
            // Try all possible divisors of substring length
            for (let divisor: number = 1; divisor < substringLength; ++divisor) {
                if (substringLength % divisor === 0) {
                    let changesNeeded: number = 0;
                  
                    // Check pairs of characters that should match in semi-palindrome pattern
                    for (let leftPos: number = 0; leftPos < substringLength; ++leftPos) {
                        // Calculate corresponding right position based on semi-palindrome structure
                        const groupsCount: number = Math.floor(substringLength / divisor);
                        const rightPos: number = (groupsCount - 1 - Math.floor(leftPos / divisor)) * divisor + (leftPos % divisor);
                      
                        // Only check each pair once (avoid double counting)
                        if (leftPos >= rightPos) {
                            break;
                        }
                      
                        // Count mismatched characters that need changing
                        if (s[startIdx - 1 + leftPos] !== s[startIdx - 1 + rightPos]) {
                            ++changesNeeded;
                        }
                    }
                  
                    // Update minimum changes for this substring
                    minChangesForSubstring[startIdx][endIdx] = Math.min(
                        minChangesForSubstring[startIdx][endIdx], 
                        changesNeeded
                    );
                }
            }
        }
    }
  
    // Calculate minimum changes for partitioning using dynamic programming
    for (let currentPos: number = 1; currentPos <= stringLength; ++currentPos) {
        for (let partitionCount: number = 1; partitionCount <= k; ++partitionCount) {
            // Try all possible positions for the previous partition
            for (let prevPartitionEnd: number = 0; prevPartitionEnd < currentPos - 1; ++prevPartitionEnd) {
                // Combine changes from previous partitions with current substring
                minChangesForPartition[currentPos][partitionCount] = Math.min(
                    minChangesForPartition[currentPos][partitionCount],
                    minChangesForPartition[prevPartitionEnd][partitionCount - 1] + 
                    minChangesForSubstring[prevPartitionEnd + 1][currentPos]
                );
            }
        }
    }
  
    // Return minimum changes to partition entire string into k groups
    return minChangesForPartition[stringLength][k];
}
