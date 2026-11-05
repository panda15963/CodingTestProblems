/**
 * Reverses every k characters for every 2k characters in a string
 * @param s - The input string to be processed
 * @param k - The number of characters to reverse in each segment
 * @returns The modified string with reversed segments
 */
function reverseStr(s: string, k: number): string {
    // Get the length of the input string
    const length: number = s.length;
  
    // Convert string to character array for in-place manipulation
    const charArray: string[] = s.split('');
  
    // Process the string in chunks of 2k characters
    for (let startIndex: number = 0; startIndex < length; startIndex += 2 * k) {
        // Calculate the left and right boundaries for reversal
        // Left boundary starts at current position
        let leftPointer: number = startIndex;
        // Right boundary is either k-1 positions ahead or end of string (whichever is smaller)
        let rightPointer: number = Math.min(startIndex + k - 1, length - 1);
      
        // Reverse the characters between left and right pointers using two-pointer technique
        while (leftPointer < rightPointer) {
            // Swap characters at left and right positions
            [charArray[leftPointer], charArray[rightPointer]] = [charArray[rightPointer], charArray[leftPointer]];
          
            // Move pointers towards center
            leftPointer++;
            rightPointer--;
        }
    }
  
    // Join the character array back into a string and return
    return charArray.join('');
}
