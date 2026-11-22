/**
 * Checks if a string is valid by ensuring it doesn't contain the substring "ba"
 * @param s - The input string to validate
 * @returns true if the string doesn't contain "ba", false otherwise
 */
function checkString(s: string): boolean {
    // Check if the string contains the forbidden substring "ba"
    // Return the negation of the result (true if "ba" is not found)
    return !s.includes('ba');
}
