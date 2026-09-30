/**
 * Finds the index of the first non-repeating character in a string
 * @param s - The input string to search
 * @returns The index of the first unique character, or -1 if none exists
 */
function firstUniqChar(s: string): number {
    // Create a frequency map to count occurrences of each character
    const characterFrequency: Map<string, number> = new Map<string, number>();
  
    // First pass: Count the frequency of each character
    for (const character of s) {
        const currentCount: number = characterFrequency.get(character) || 0;
        characterFrequency.set(character, currentCount + 1);
    }
  
    // Second pass: Find the first character with frequency of 1
    for (let index: number = 0; index < s.length; index++) {
        const currentCharacter: string = s[index];
      
        // Check if current character appears only once
        if (characterFrequency.get(currentCharacter) === 1) {
            return index;
        }
    }
  
    // No unique character found
    return -1;
}
