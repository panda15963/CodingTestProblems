/**
 * Checks if a string can be constructed by repeating a substring pattern
 * @param s - The input string to check for repeated pattern
 * @returns true if the string is formed by repeating a substring, false otherwise
 */
function repeatedSubstringPattern(s: string): boolean {
    // Concatenate the string with itself to create a doubled string
    const doubledString: string = s + s;
  
    // Remove the first and last character from the doubled string
    // This ensures we don't match the original string at position 0 or at position s.length
    const startIndex: number = 1;
    const endIndex: number = (s.length << 1) - 1;  // Equivalent to (s.length * 2) - 1
    const slicedString: string = doubledString.slice(startIndex, endIndex);
  
    // If the original string exists in the sliced doubled string,
    // it means the string can be formed by repeating a pattern
    return slicedString.includes(s);
}
