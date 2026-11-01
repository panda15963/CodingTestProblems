/**
 * Finds the length of the longest uncommon subsequence between two strings.
 * 
 * The longest uncommon subsequence is defined as the longest subsequence 
 * of one of these strings which is not a subsequence of the other string.
 * 
 * Key insight: If the two strings are identical, no uncommon subsequence exists.
 * If they are different, the longer string itself is the longest uncommon subsequence.
 * 
 * @param a - The first string to compare
 * @param b - The second string to compare
 * @returns The length of the longest uncommon subsequence, or -1 if none exists
 */
function findLUSlength(a: string, b: string): number {
    // If strings are identical, no uncommon subsequence exists
    if (a === b) {
        return -1;
    }
  
    // If strings are different, the longer string is the longest uncommon subsequence
    // since the entire string cannot be a subsequence of a different string
    return Math.max(a.length, b.length);
}
