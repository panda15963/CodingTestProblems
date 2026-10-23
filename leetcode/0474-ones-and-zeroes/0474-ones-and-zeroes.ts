/**
 * Finds the maximum number of strings that can be formed with given m 0s and n 1s
 * @param strs - Array of binary strings
 * @param m - Maximum number of 0s available
 * @param n - Maximum number of 1s available
 * @returns Maximum number of strings that can be formed
 */
function findMaxForm(strs: string[], m: number, n: number): number {
    const stringCount = strs.length;
  
    // Initialize 3D DP array: dp[i][j][k] represents max strings using first i strings with j 0s and k 1s
    const dp = Array.from({ length: stringCount + 1 }, () =>
        Array.from({ length: m + 1 }, () => 
            Array.from({ length: n + 1 }, () => 0)
        )
    );
  
    /**
     * Counts the number of 0s and 1s in a binary string
     * @param str - Binary string to count
     * @returns Tuple of [count of 0s, count of 1s]
     */
    const countZerosAndOnes = (str: string): [number, number] => {
        let zeroCount = 0;
      
        // Count all 0s in the string
        for (const char of str) {
            zeroCount += char === '0' ? 1 : 0;
        }
      
        // Calculate 1s count as total length minus 0s count
        const oneCount = str.length - zeroCount;
        return [zeroCount, oneCount];
    };
  
    // Fill the DP table
    for (let i = 1; i <= stringCount; ++i) {
        // Get count of 0s and 1s for current string
        const [zerosNeeded, onesNeeded] = countZerosAndOnes(strs[i - 1]);
      
        // Iterate through all possible states of available 0s
        for (let availableZeros = 0; availableZeros <= m; ++availableZeros) {
            // Iterate through all possible states of available 1s
            for (let availableOnes = 0; availableOnes <= n; ++availableOnes) {
                // Option 1: Don't include current string
                dp[i][availableZeros][availableOnes] = dp[i - 1][availableZeros][availableOnes];
              
                // Option 2: Include current string if we have enough 0s and 1s
                if (availableZeros >= zerosNeeded && availableOnes >= onesNeeded) {
                    dp[i][availableZeros][availableOnes] = Math.max(
                        dp[i][availableZeros][availableOnes],
                        dp[i - 1][availableZeros - zerosNeeded][availableOnes - onesNeeded] + 1
                    );
                }
            }
        }
    }
  
    // Return the maximum strings that can be formed using all strings with m 0s and n 1s
    return dp[stringCount][m][n];
}
