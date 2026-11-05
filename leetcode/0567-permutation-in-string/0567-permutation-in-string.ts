/**
 * Checks if s2 contains a permutation of s1 as a substring
 * Uses sliding window technique with character frequency counting
 * 
 * @param s1 - The pattern string whose permutation we're looking for
 * @param s2 - The string to search within
 * @returns true if s2 contains any permutation of s1, false otherwise
 */
function checkInclusion(s1: string, s2: string): boolean {
    // Number of unique characters that still need to be matched
    let uniqueCharsNeeded: number = 0;
  
    // Character frequency array for lowercase English letters (a-z)
    // Positive values indicate chars needed from s1, negative means excess chars
    const charFrequency: number[] = Array(26).fill(0);
  
    // ASCII value of 'a' for index calculation
    const asciiOffsetA: number = 'a'.charCodeAt(0);
  
    // Build frequency map for s1 and count unique characters
    for (const char of s1) {
        const charIndex: number = char.charCodeAt(0) - asciiOffsetA;
        charFrequency[charIndex]++;
      
        // If this is the first occurrence of this character, increment unique count
        if (charFrequency[charIndex] === 1) {
            uniqueCharsNeeded++;
        }
    }

    const patternLength: number = s1.length;
    const textLength: number = s2.length;
  
    // Sliding window approach through s2
    for (let windowEnd: number = 0; windowEnd < textLength; windowEnd++) {
        // Add current character to the window
        const currentCharIndex: number = s2.charCodeAt(windowEnd) - asciiOffsetA;
        charFrequency[currentCharIndex]--;
      
        // If frequency becomes 0, this character is perfectly matched
        if (charFrequency[currentCharIndex] === 0) {
            uniqueCharsNeeded--;
        }
      
        // Remove the leftmost character if window size exceeds pattern length
        if (windowEnd >= patternLength) {
            const leftCharIndex: number = s2.charCodeAt(windowEnd - patternLength) - asciiOffsetA;
            charFrequency[leftCharIndex]++;
          
            // If frequency becomes 1, we now need this character again
            if (charFrequency[leftCharIndex] === 1) {
                uniqueCharsNeeded++;
            }
        }
      
        // All characters are matched when uniqueCharsNeeded becomes 0
        if (uniqueCharsNeeded === 0) {
            return true;
        }
    }
  
    return false;
}
