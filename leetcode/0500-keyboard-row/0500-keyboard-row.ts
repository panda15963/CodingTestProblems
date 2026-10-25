/**
 * Finds words that can be typed using letters from only one row of a keyboard
 * @param words - Array of words to check
 * @returns Array of words that can be typed using only one keyboard row
 */
function findWords(words: string[]): string[] {
    // Mapping of each letter (a-z) to its keyboard row (0, 1, or 2)
    // Row 0: qwertyuiop
    // Row 1: asdfghjkl
    // Row 2: zxcvbnm
    const keyboardRowMapping: string = '12210111011122000010020202';
    const validWords: string[] = [];
  
    // Check each word in the input array
    for (const word of words) {
        // Convert word to lowercase for case-insensitive comparison
        const lowercaseWord: string = word.toLowerCase();
      
        // Get the row number of the first character
        const firstCharIndex: number = lowercaseWord.charCodeAt(0) - 'a'.charCodeAt(0);
        const targetRow: string = keyboardRowMapping[firstCharIndex];
      
        // Check if all characters belong to the same row
        let isValidWord: boolean = true;
        for (const char of lowercaseWord) {
            const charIndex: number = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if (keyboardRowMapping[charIndex] !== targetRow) {
                isValidWord = false;
                break;
            }
        }
      
        // Add the original word if all characters are from the same row
        if (isValidWord) {
            validWords.push(word);
        }
    }
  
    return validWords;
}
