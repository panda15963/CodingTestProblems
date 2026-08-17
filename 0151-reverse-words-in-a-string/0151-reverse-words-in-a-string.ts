/**
 * Reverses the order of words in a string while handling multiple spaces
 * @param s - Input string containing words separated by spaces
 * @returns String with words in reversed order, separated by single spaces
 */
function reverseWords(s: string): string {
    // Array to store individual words extracted from the string
    const words: string[] = [];
  
    // Get the total length of the input string
    const stringLength: number = s.length;
  
    // Index pointer to traverse through the string
    let currentIndex: number = 0;
  
    // Process the entire string character by character
    while (currentIndex < stringLength) {
        // Skip leading spaces before each word
        while (currentIndex < stringLength && s[currentIndex] === ' ') {
            currentIndex++;
        }
      
        // Check if we haven't reached the end after skipping spaces
        if (currentIndex < stringLength) {
            // Mark the start of the current word
            let wordEndIndex: number = currentIndex;
          
            // Find the end of the current word (until we hit a space or string end)
            while (wordEndIndex < stringLength && s[wordEndIndex] !== ' ') {
                wordEndIndex++;
            }
          
            // Extract the word and add it to the words array
            words.push(s.slice(currentIndex, wordEndIndex));
          
            // Move the current index to continue processing after this word
            currentIndex = wordEndIndex;
        }
    }
  
    // Reverse the array of words and join them with single spaces
    return words.reverse().join(' ');
}
