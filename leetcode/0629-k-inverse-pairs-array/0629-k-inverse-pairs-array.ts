/**
 * Counts the number of different arrays consisting of numbers from 1 to n 
 * such that there are exactly k inverse pairs.
 * An inverse pair is a pair of integers [i, j] where 0 <= i < j < n and a[i] > a[j].
 * 
 * @param n - The upper bound of numbers in the array (1 to n)
 * @param k - The exact number of inverse pairs required
 * @returns The number of different arrays modulo 10^9 + 7
 */
function kInversePairs(n: number, k: number): number {
    const MOD: number = 1000000007;
  
    // dp[j] represents the number of permutations with exactly j inverse pairs
    // for the current iteration (current value of i)
    const dp: number[] = Array(k + 1).fill(0);
    dp[0] = 1; // Base case: one way to have 0 inverse pairs
  
    // prefixSum[j] stores the prefix sum of dp array up to index j-1
    // Used for optimization to calculate range sums in O(1)
    const prefixSum: number[] = Array(k + 2).fill(1);
    prefixSum[0] = 0;
  
    // Iterate through each number from 1 to n
    for (let i = 1; i <= n; ++i) {
        // Calculate dp values for current i
        for (let j = 1; j <= k; ++j) {
            // When adding number i to permutations of (i-1) numbers,
            // we can create 0 to min(j, i-1) new inverse pairs
            // Sum all valid previous states using prefix sum optimization
            const minInversePairs: number = Math.max(0, j - (i - 1));
            dp[j] = (prefixSum[j + 1] - prefixSum[minInversePairs] + MOD) % MOD;
        }
      
        // Update prefix sum array for next iteration
        for (let j = 1; j <= k + 1; ++j) {
            prefixSum[j] = (prefixSum[j - 1] + dp[j - 1]) % MOD;
        }
    }
  
    return dp[k];
}
