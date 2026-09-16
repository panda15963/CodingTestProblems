/**
 * Finds the maximum product of lengths of two words that don't share common letters
 * @param words - Array of words containing only lowercase English letters
 * @returns Maximum product of lengths of two words with no common letters
 */
function maxProduct(words: string[]): number {
    const wordCount: number = words.length;
    // Bitmask array to store character presence for each word
    // Each bit position represents a letter (a=0, b=1, ..., z=25)
    const characterMasks: number[] = Array(wordCount).fill(0);
    let maxProductValue: number = 0;
  
    // Process each word
    for (let currentIndex = 0; currentIndex < wordCount; ++currentIndex) {
        // Build bitmask for current word by setting bits for each character
        for (const character of words[currentIndex]) {
            // Set the bit corresponding to the character
            // 'a' maps to bit 0, 'b' to bit 1, etc.
            const bitPosition: number = character.charCodeAt(0) - 'a'.charCodeAt(0);
            characterMasks[currentIndex] |= 1 << bitPosition;
        }
      
        // Compare current word with all previous words
        for (let previousIndex = 0; previousIndex < currentIndex; ++previousIndex) {
            // Check if words share any common characters using bitwise AND
            // If result is 0, no common characters exist
            if ((characterMasks[currentIndex] & characterMasks[previousIndex]) === 0) {
                // Calculate product of lengths and update maximum if needed
                const currentProduct: number = words[currentIndex].length * words[previousIndex].length;
                maxProductValue = Math.max(maxProductValue, currentProduct);
            }
        }
    }
  
    return maxProductValue;
}
