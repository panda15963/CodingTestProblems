/**
 * Counts the number of special characters in a word.
 * A character is special if its lowercase version appears before its uppercase version.
 * 
 * @param word - The input string to analyze
 * @returns The count of special characters
 */
function numberOfSpecialChars(word: string): number {
    // ASCII value of 'z' is 122, creating arrays of size 123 to cover all lowercase/uppercase letters
    const ASCII_SIZE = 'z'.charCodeAt(0) + 1;
  
    // Track the first occurrence position (1-indexed) of each character
    const firstOccurrence: number[] = Array.from({ length: ASCII_SIZE }, () => 0);
  
    // Track the last occurrence position (1-indexed) of each character
    const lastOccurrence: number[] = Array.from({ length: ASCII_SIZE }, () => 0);
  
    // Iterate through the word to record first and last occurrences
    for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);
      
        // Set first occurrence only if not previously set (using 1-indexed position)
        if (firstOccurrence[charCode] === 0) {
            firstOccurrence[charCode] = i + 1;
        }
      
        // Always update last occurrence (using 1-indexed position)
        lastOccurrence[charCode] = i + 1;
    }
  
    let specialCharCount = 0;
    const LOWERCASE_A = 'a'.charCodeAt(0);
    const UPPERCASE_A = 'A'.charCodeAt(0);
  
    // Check each letter of the alphabet (26 letters)
    for (let i = 0; i < 26; i++) {
        const lowercaseCode = LOWERCASE_A + i;
        const uppercaseCode = UPPERCASE_A + i;
      
        // A letter is special if:
        // 1. Its lowercase version exists (lastOccurrence > 0)
        // 2. Its uppercase version exists (firstOccurrence > 0)
        // 3. The last lowercase occurrence comes before the first uppercase occurrence
        if (lastOccurrence[lowercaseCode] > 0 &&
            firstOccurrence[uppercaseCode] > 0 &&
            lastOccurrence[lowercaseCode] < firstOccurrence[uppercaseCode]) {
            specialCharCount++;
        }
    }
  
    return specialCharCount;
}