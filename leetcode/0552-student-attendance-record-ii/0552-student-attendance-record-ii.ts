function checkRecord(n: number): number {
    // dp[day][absences][consecutiveLates] = number of valid attendance records
    // day: current day (0 to n-1)
    // absences: number of 'A' (absent) records so far (0 or 1)
    // consecutiveLates: number of consecutive 'L' (late) records ending at current position (0, 1, or 2)
    const dp: number[][][] = Array(n)
        .fill(null)
        .map(() => Array(2)
            .fill(null)
            .map(() => Array(3).fill(-1))
        );
  
    const MOD = 1e9 + 7;
  
    // Recursive function with memoization to count valid attendance records
    const dfs = (day: number, absenceCount: number, consecutiveLates: number): number => {
        // Base case: reached the end of n days
        if (day >= n) {
            return 1;
        }
      
        // Return memoized result if already computed
        if (dp[day][absenceCount][consecutiveLates] !== -1) {
            return dp[day][absenceCount][consecutiveLates];
        }
      
        // Option 1: Mark as 'P' (present) - always allowed
        // Reset consecutive late count to 0
        let result = dfs(day + 1, absenceCount, 0);
      
        // Option 2: Mark as 'A' (absent) - only if no previous absence
        if (absenceCount === 0) {
            result = (result + dfs(day + 1, absenceCount + 1, 0)) % MOD;
        }
      
        // Option 3: Mark as 'L' (late) - only if less than 2 consecutive lates
        if (consecutiveLates < 2) {
            result = (result + dfs(day + 1, absenceCount, consecutiveLates + 1)) % MOD;
        }
      
        // Memoize and return the result
        dp[day][absenceCount][consecutiveLates] = result;
        return result;
    };
  
    // Start from day 0 with 0 absences and 0 consecutive lates
    return dfs(0, 0, 0);
}
