/**
 * Checks if a student's attendance record qualifies for an attendance award.
 * A student qualifies if they have fewer than 2 absences ('A') and no more than 2 consecutive late days ('L').
 * 
 * @param s - The attendance record string containing 'A' (Absent), 'L' (Late), and 'P' (Present)
 * @returns true if the student qualifies for the award, false otherwise
 */
function checkRecord(s: string): boolean {
    // Check two conditions:
    // 1. At most one 'A': indexOf('A') equals lastIndexOf('A') means 'A' appears at most once
    //    - If no 'A' exists, both return -1 (equal)
    //    - If one 'A' exists, both return the same index (equal)
    //    - If multiple 'A's exist, they return different indices (not equal)
    const hasAtMostOneAbsence: boolean = s.indexOf('A') === s.lastIndexOf('A');
  
    // 2. No three consecutive 'L's: indexOf('LLL') returns -1 if pattern not found
    const hasNoThreeConsecutiveLates: boolean = s.indexOf('LLL') === -1;
  
    // Student qualifies only if both conditions are met
    return hasAtMostOneAbsence && hasNoThreeConsecutiveLates;
}
