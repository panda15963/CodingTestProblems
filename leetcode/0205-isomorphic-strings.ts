/**
 * Determines if two strings are isomorphic.
 * Two strings are isomorphic if characters in string s can be replaced to get string t.
 * Each character must map to exactly one character (bijection).
 * 
 * @param s - The first string to compare
 * @param t - The second string to compare
 * @returns true if the strings are isomorphic, false otherwise
 */
function isIsomorphic(s: string, t: string): boolean {
    // Array to store the last seen position of each character in string s
    // Using 256 to cover all extended ASCII characters
    const lastPositionInS: number[] = new Array(256).fill(0);
  
    // Array to store the last seen position of each character in string t
    const lastPositionInT: number[] = new Array(256).fill(0);
  
    // Iterate through both strings simultaneously
    for (let i = 0; i < s.length; ++i) {
        // Get ASCII code of current character in string s
        const charCodeS = s.charCodeAt(i);
      
        // Get ASCII code of current character in string t
        const charCodeT = t.charCodeAt(i);
      
        // Check if the mapping is consistent
        // If characters have different last seen positions, they don't map correctly
        if (lastPositionInS[charCodeS] !== lastPositionInT[charCodeT]) {
            return false;
        }
      
        // Update last seen position for both characters
        // Using i + 1 to distinguish from initial value 0
        lastPositionInS[charCodeS] = i + 1;
        lastPositionInT[charCodeT] = i + 1;
    }
  
    // All characters map consistently
    return true;
}
