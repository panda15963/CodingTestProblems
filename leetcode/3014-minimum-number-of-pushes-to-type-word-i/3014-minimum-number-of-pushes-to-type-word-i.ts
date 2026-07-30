/**
 * Calculates the minimum number of button pushes needed to type a word
 * on a phone keypad where letters are distributed across 8 keys (2-9).
 * Each key can hold multiple letters, and the push count increases
 * based on the position of the letter on that key.
 * 
 * @param word - The input string to be typed
 * @returns The minimum number of button pushes required
 */
function minimumPushes(word: string): number {
    // Get the length of the input word
    const wordLength: number = word.length;
  
    // Initialize the total number of pushes
    let totalPushes: number = 0;
  
    // Track the current layer/position of letters on keys (1st, 2nd, 3rd, etc.)
    let currentLayer: number = 1;
  
    // Calculate pushes for complete groups of 8 letters
    // Each group of 8 letters fills all 8 keys at the current layer
    const completeGroups: number = Math.floor(wordLength / 8);
  
    for (let groupIndex = 0; groupIndex < completeGroups; groupIndex++) {
        // Add pushes for 8 letters at the current layer
        // (currentLayer pushes per letter × 8 letters)
        totalPushes += currentLayer * 8;
      
        // Move to the next layer for the next group
        currentLayer++;
    }
  
    // Calculate pushes for remaining letters (less than 8)
    const remainingLetters: number = wordLength % 8;
    totalPushes += currentLayer * remainingLetters;
  
    return totalPushes;
}
