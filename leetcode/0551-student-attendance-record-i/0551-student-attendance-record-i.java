class Solution {
    /**
     * Checks if a student's attendance record qualifies for an attendance award.
     * The student qualifies if:
     * 1. They were absent ('A') for strictly fewer than 2 days total
     * 2. They were never late ('L') for 3 or more consecutive days
     * 
     * @param s the attendance record string containing 'A' (Absent), 'L' (Late), 'P' (Present)
     * @return true if the student qualifies for the award, false otherwise
     */
    public boolean checkRecord(String s) {
        // Check if student has at most one absence by verifying first and last occurrence of 'A' are the same
        // If indexOf and lastIndexOf return the same value, 'A' appears at most once
        // (both return -1 if no 'A', or same index if exactly one 'A')
        boolean hasAtMostOneAbsence = s.indexOf("A") == s.lastIndexOf("A");
      
        // Check if student was never late for 3 consecutive days
        boolean noThreeConsecutiveLates = !s.contains("LLL");
      
        // Student qualifies only if both conditions are met
        return hasAtMostOneAbsence && noThreeConsecutiveLates;
    }
}
