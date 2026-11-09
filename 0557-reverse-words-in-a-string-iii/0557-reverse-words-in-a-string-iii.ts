/**
 * Reverses the characters in each word of a string while maintaining word order and spaces
 * @param s - The input string containing words separated by spaces
 * @returns A new string with each word's characters reversed
 */
function reverseWords(s: string): string {
    // Split the string into an array of words using space as delimiter
    const words: string[] = s.split(' ');
  
    // Reverse the characters in each word
    const reversedWords: string[] = words.map((word: string) => {
        // Convert word to character array, reverse it, then join back to string
        return word.split('').reverse().join('');
    });
  
    // Join the reversed words back together with spaces
    return reversedWords.join(' ');
}
