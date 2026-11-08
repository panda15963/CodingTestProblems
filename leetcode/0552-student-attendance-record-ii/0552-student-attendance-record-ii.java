class Solution {
    private static final int MOD = 1_000_000_007;
    private int recordLength;
    private Integer[][][] memo;
  
    /**
     * Counts the number of valid attendance records of length n.
     * A record is valid if it contains:
     * - At most one 'A' (absent)
     * - No more than two consecutive 'L' (late)
     * 
     * @param n the length of the attendance record
     * @return the number of valid attendance records modulo 10^9 + 7
     */
    public int checkRecord(int n) {
        this.recordLength = n;
        // memo[day][absenceCount][consecutiveLates]
        // - day: current position in the record (0 to n-1)
        // - absenceCount: number of 'A's used so far (0 or 1)
        // - consecutiveLates: number of consecutive 'L's ending at current position (0, 1, or 2)
        this.memo = new Integer[n][2][3];
      
        // Start DFS from day 0 with 0 absences and 0 consecutive lates
        return dfs(0, 0, 0);
    }
  
    /**
     * Recursively calculates the number of valid attendance records.
     * 
     * @param currentDay the current day/position in the record
     * @param absenceCount the number of 'A's used so far (0 or 1)
     * @param consecutiveLates the number of consecutive 'L's ending at current position
     * @return the number of valid records from this state
     */
    private int dfs(int currentDay, int absenceCount, int consecutiveLates) {
        // Base case: reached the end of the record successfully
        if (currentDay >= recordLength) {
            return 1;
        }
      
        // Check if this state has been computed before
        if (memo[currentDay][absenceCount][consecutiveLates] != null) {
            return memo[currentDay][absenceCount][consecutiveLates];
        }
      
        // Option 1: Mark as 'P' (present) - always allowed
        // Reset consecutive lates to 0 when marking present
        int validRecords = dfs(currentDay + 1, absenceCount, 0);
      
        // Option 2: Mark as 'A' (absent) - only if no absence used yet
        if (absenceCount == 0) {
            validRecords = (validRecords + dfs(currentDay + 1, absenceCount + 1, 0)) % MOD;
        }
      
        // Option 3: Mark as 'L' (late) - only if less than 2 consecutive lates
        if (consecutiveLates < 2) {
            validRecords = (validRecords + dfs(currentDay + 1, absenceCount, consecutiveLates + 1)) % MOD;
        }
      
        // Memoize and return the result
        memo[currentDay][absenceCount][consecutiveLates] = validRecords;
        return validRecords;
    }
}
