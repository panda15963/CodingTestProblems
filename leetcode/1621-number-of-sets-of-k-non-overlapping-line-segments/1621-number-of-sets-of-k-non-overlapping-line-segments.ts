/**
 * Counts the number of ways to draw k non-overlapping line segments on n points
 * @param n - The number of points on a line
 * @param k - The number of line segments to draw
 * @returns The number of ways modulo 10^9 + 7
 */
function numberOfSets(n: number, k: number): number {
    // dp[i][j] represents the number of ways to draw j segments using first i points
    // where the last segment does NOT end at point i
    const dpNotEnding: number[][] = Array.from(
        { length: n + 1 }, 
        () => new Array(k + 1).fill(0)
    );
  
    // dp[i][j] represents the number of ways to draw j segments using first i points
    // where the last segment DOES end at point i
    const dpEnding: number[][] = Array.from(
        { length: n + 1 }, 
        () => new Array(k + 1).fill(0)
    );
  
    // Base case: with 1 point and 0 segments, there's 1 way (empty set)
    dpNotEnding[1][0] = 1;
  
    const MOD: number = 10 ** 9 + 7;
  
    // Iterate through each point position
    for (let i = 2; i <= n; ++i) {
        // Iterate through each possible number of segments
        for (let j = 0; j <= k; ++j) {
            // Ways where j segments don't end at point i = 
            // ways from previous point (either ending or not ending there)
            dpNotEnding[i][j] = (dpNotEnding[i - 1][j] + dpEnding[i - 1][j]) % MOD;
          
            // Extend segments that ended at point i-1 to point i
            dpEnding[i][j] = dpEnding[i - 1][j];
          
            if (j > 0) {
                // Start a new segment at point i (from any previous configuration with j-1 segments)
                dpEnding[i][j] = (dpEnding[i][j] + dpNotEnding[i - 1][j - 1]) % MOD;
              
                // Extend a segment that was already ending at i-1 with j-1 segments
                dpEnding[i][j] = (dpEnding[i][j] + dpEnding[i - 1][j - 1]) % MOD;
            }
        }
    }
  
    // Return total ways: segments either ending or not ending at point n
    return (dpNotEnding[n][k] + dpEnding[n][k]) % MOD;
}
