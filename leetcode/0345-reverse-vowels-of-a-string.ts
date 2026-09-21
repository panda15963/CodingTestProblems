/**
 * Reverses only the vowels in a given string
 * @param s - The input string to process
 * @returns A new string with vowels reversed in their positions
 */
function reverseVowels(s: string): string {
    // Create a set of vowels for O(1) lookup time
    const vowelSet: Set<string> = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  
    // Convert string to character array for in-place swapping
    const charArray: string[] = s.split('');
  
    // Initialize two pointers: left starting from beginning, right from end
    let leftPointer: number = 0;
    let rightPointer: number = charArray.length - 1;
  
    // Continue until the two pointers meet
    while (leftPointer < rightPointer) {
        // Move left pointer forward until a vowel is found
        while (leftPointer < rightPointer && !vowelSet.has(charArray[leftPointer])) {
            leftPointer++;
        }
      
        // Move right pointer backward until a vowel is found
        while (leftPointer < rightPointer && !vowelSet.has(charArray[rightPointer])) {
            rightPointer--;
        }
      
        // Swap the vowels at left and right positions
        if (leftPointer < rightPointer) {
            [charArray[leftPointer], charArray[rightPointer]] = [charArray[rightPointer], charArray[leftPointer]];
            leftPointer++;
            rightPointer--;
        }
    }
  
    // Join the character array back into a string
    return charArray.join('');
}
