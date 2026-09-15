/**
 * Calculates maximum coins obtained by bursting all balloons
 * @param nums - Array of balloon values
 * @returns Maximum coins that can be collected
 */
function maxCoins(nums: number[]): number {
    const balloonCount: number = nums.length;
  
    // Create padded array with 1s at boundaries for easier calculation
    // This represents virtual balloons at edges that cannot be burst
    const paddedBalloons: number[] = Array(balloonCount + 2).fill(1);
    for (let i = 0; i < balloonCount; i++) {
        paddedBalloons[i + 1] = nums[i];
    }

    // Dynamic programming table
    // dp[left][right] represents maximum coins obtainable from bursting 
    // all balloons between indices left and right (exclusive)
    const dp: number[][] = Array.from(
        { length: balloonCount + 2 }, 
        () => Array(balloonCount + 2).fill(0)
    );
  
    // Iterate through all possible intervals from smallest to largest
    for (let left = balloonCount - 1; left >= 0; left--) {
        for (let right = left + 2; right <= balloonCount + 1; right++) {
            // Try bursting each balloon as the last one in the interval
            for (let lastBurst = left + 1; lastBurst < right; lastBurst++) {
                // Calculate coins gained if balloon at lastBurst is burst last
                // This equals coins from left subproblem + right subproblem + current burst value
                const coinsGained: number = dp[left][lastBurst] + 
                                           dp[lastBurst][right] + 
                                           paddedBalloons[left] * paddedBalloons[lastBurst] * paddedBalloons[right];
              
                dp[left][right] = Math.max(dp[left][right], coinsGained);
            }
        }
    }
  
    // Return maximum coins for the entire array (between indices 0 and n+1)
    return dp[0][balloonCount + 1];
}
