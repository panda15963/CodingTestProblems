/**
 * Detects if the capitalization of a word follows valid patterns.
 * Valid patterns are:
 * 1. All letters are capitals (e.g., "USA")
 * 2. All letters are lowercase (e.g., "leetcode")
 * 3. Only the first letter is capital (e.g., "Google")
 * 
 * @param word - The input string to check for valid capital usage
 * @returns true if the word uses capitals correctly, false otherwise
 */
function detectCapitalUse(word: string): boolean {
    // Count the number of uppercase letters in the word
    const uppercaseCount: number = word
        .split('')
        .reduce((accumulator: number, character: string) => {
            // Increment counter if character is uppercase
            return accumulator + (character === character.toUpperCase() ? 1 : 0);
        }, 0);
  
    // Check if the word matches one of the three valid patterns:
    // 1. No uppercase letters (all lowercase)
    // 2. All uppercase letters
    // 3. Exactly one uppercase letter at the beginning
    return uppercaseCount === 0 || 
           uppercaseCount === word.length || 
           (uppercaseCount === 1 && word[0] === word[0].toUpperCase());
}
