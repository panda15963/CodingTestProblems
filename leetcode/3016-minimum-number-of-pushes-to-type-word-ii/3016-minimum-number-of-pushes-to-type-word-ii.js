/**
 * Calculates the minimum number of pushes needed to type a word on a phone keypad
 * where letters can be mapped to keys optimally.
 *
 * @param {string} word
 * @return {number}
 */
function minimumPushes(word) {
    // Frequency of each lowercase letter
    const letterFrequencies = Array(26).fill(0);

    // Count letter frequencies
    for (const char of word) {
        const letterIndex = char.charCodeAt(0) - "a".charCodeAt(0);
        letterFrequencies[letterIndex]++;
    }

    // Sort frequencies in descending order
    letterFrequencies.sort((a, b) => b - a);

    let totalPushes = 0;

    // First 8 letters require 1 push,
    // next 8 require 2 pushes, and so on.
    for (let i = 0; i < 26; i++) {
        const pushesPerLetter = Math.floor(i / 8) + 1;
        totalPushes += pushesPerLetter * letterFrequencies[i];
    }

    return totalPushes;
}