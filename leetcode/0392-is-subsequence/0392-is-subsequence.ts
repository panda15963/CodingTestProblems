/**
 * Determines if string s is a subsequence of string t.
 * A subsequence is a sequence that can be derived from another sequence
 * by deleting some or no elements without changing the order of the remaining elements.
 * 
 * @param s - The potential subsequence string
 * @param t - The string to check against
 * @returns true if s is a subsequence of t, false otherwise
 */
function isSubsequence(s: string, t: string): boolean {
    const sLength: number = s.length;
    const tLength: number = t.length;
  
    // Pointer for tracking position in string s
    let sPointer: number = 0;
  
    // Iterate through string t while we haven't matched all characters in s
    for (let tPointer: number = 0; sPointer < sLength && tPointer < tLength; tPointer++) {
        // If current characters match, advance the pointer in string s
        if (s[sPointer] === t[tPointer]) {
            sPointer++;
        }
    }
  
    // If we've matched all characters in s, it's a subsequence
    return sPointer === sLength;
}
