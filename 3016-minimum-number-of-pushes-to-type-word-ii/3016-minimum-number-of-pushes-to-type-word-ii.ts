/**
 * Calculates the minimum number of pushes needed to type a word on a phone keypad
 * where letters can be mapped to keys optimally
 * @param word - The input word to be typed
 * @returns The minimum number of key pushes required
 */
function minimumPushes(word: string): number {
    // Initialize frequency counter array for 26 lowercase letters
    const letterFrequencies: number[] = Array(26).fill(0);
  
    // Count the frequency of each letter in the word
    for (const char of word) {
        const letterIndex = char.charCodeAt(0) - 'a'.charCodeAt(0);
        letterFrequencies[letterIndex]++;
    }
  
    // Sort frequencies in descending order to assign most frequent letters first
    letterFrequencies.sort((a, b) => b - a);
  
    // Calculate minimum pushes needed
    let totalPushes = 0;
  
    // Assign letters to keys (8 keys available, 2-9 on phone keypad)
    // First 8 letters need 1 push, next 8 need 2 pushes, etc.
    for (let i = 0; i < 26; i++) {
        // Calculate number of pushes for this letter position
        // Math.floor(i / 8) gives us the "layer" (0 for first 8, 1 for next 8, etc.)
        const pushesPerLetter = Math.floor(i / 8) + 1;
      
        // Add total pushes for this letter (frequency * pushes per occurrence)
        totalPushes += pushesPerLetter * letterFrequencies[i];
    }
  
    return totalPushes;
}