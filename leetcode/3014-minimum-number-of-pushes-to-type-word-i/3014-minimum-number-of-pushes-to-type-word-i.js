/**
 * Calculates the minimum number of button pushes needed to type a word
 * on a phone keypad where letters are distributed across 8 keys (2-9).
 *
 * @param {string} word
 * @return {number}
 */
function minimumPushes(word) {
    // Get the length of the input word
    const wordLength = word.length;

    // Initialize the total number of pushes
    let totalPushes = 0;

    // Track the current layer of letters on the keys
    let currentLayer = 1;

    // Calculate complete groups of 8 letters
    const completeGroups = Math.floor(wordLength / 8);

    for (let groupIndex = 0; groupIndex < completeGroups; groupIndex++) {
        // Each group contributes currentLayer * 8 pushes
        totalPushes += currentLayer * 8;

        // Move to the next layer
        currentLayer++;
    }

    // Add pushes for the remaining letters
    const remainingLetters = wordLength % 8;
    totalPushes += currentLayer * remainingLetters;

    return totalPushes;
}