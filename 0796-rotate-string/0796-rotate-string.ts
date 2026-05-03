/**
 * Determines if string 'goal' is a rotation of string 's'.
 * A rotation means moving some characters from the beginning to the end.
 * For example: "abcde" rotated by 2 positions becomes "cdeab".
 * 
 * @param s - The original string
 * @param goal - The target string to check if it's a rotation of s
 * @returns true if goal is a rotation of s, false otherwise
 */
function rotateString(s: string, goal: string): boolean {
    // First check: strings must have the same length to be rotations of each other
    const isSameLength: boolean = s.length === goal.length;
  
    // Second check: if s is a rotation of goal, then s will appear as a substring
    // in the concatenation of goal with itself (goal + goal)
    // Example: if s="cdeab" and goal="abcde", then "abcdeabcde" contains "cdeab"
    const isRotation: boolean = (goal + goal).includes(s);
  
    // Both conditions must be true for goal to be a valid rotation of s
    return isSameLength && isRotation;
}