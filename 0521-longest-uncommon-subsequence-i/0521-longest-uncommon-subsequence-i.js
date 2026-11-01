/**
 * Finds the length of the longest uncommon subsequence between two strings.
 *
 * @param {string} a - The first string
 * @param {string} b - The second string
 * @return {number} The length of the longest uncommon subsequence, or -1 if none exists
 */
var findLUSlength = function(a, b) {
    // If strings are identical, no uncommon subsequence exists
    if (a === b) {
        return -1;
    }

    // If strings are different, the longer string is the answer
    return Math.max(a.length, b.length);
};