/**
 * Finds the longest word in dictionary that can be formed by deleting characters from string s
 * @param s - The source string to form words from
 * @param dictionary - Array of words to check against
 * @returns The longest word that can be formed, or lexicographically smallest if there's a tie
 */
function findLongestWord(s: string, dictionary: string[]): string {
    /**
     * Checks if word can be formed as a subsequence of targetString
     * @param word - The word to check if it's a subsequence
     * @param targetString - The string to check against
     * @returns True if word is a subsequence of targetString
     */
    const isSubsequence = (word: string, targetString: string): boolean => {
        const wordLength = word.length;
        const targetLength = targetString.length;
      
        let wordIndex = 0;
      
        // Iterate through target string and match characters with word
        for (let targetIndex = 0; wordIndex < wordLength && targetIndex < targetLength; targetIndex++) {
            if (word[wordIndex] === targetString[targetIndex]) {
                wordIndex++;
            }
        }
      
        // Check if all characters in word were matched
        return wordIndex === wordLength;
    };
  
    let longestWord: string = '';
  
    // Check each word in the dictionary
    for (const currentWord of dictionary) {
        const longestWordLength = longestWord.length;
        const currentWordLength = currentWord.length;
      
        // Update longest word if current word is:
        // 1. A subsequence of s, AND
        // 2. Longer than current longest, OR same length but lexicographically smaller
        if (isSubsequence(currentWord, s) && 
            (longestWordLength < currentWordLength || 
             (longestWordLength === currentWordLength && longestWord > currentWord))) {
            longestWord = currentWord;
        }
    }
  
    return longestWord;
}
