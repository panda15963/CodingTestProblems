/**
 * Counts the number of special characters in a word.
 * A character is special if its lowercase version appears before its uppercase version.
 * 
 * @param {string} word - The input string to analyze
 * @returns {number} The count of special characters
 */
function numberOfSpecialChars(word) {
    const ASCII_SIZE = 'z'.charCodeAt(0) + 1;

    const firstOccurrence = Array.from({ length: ASCII_SIZE }, () => 0);
    const lastOccurrence = Array.from({ length: ASCII_SIZE }, () => 0);

    for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);

        if (firstOccurrence[charCode] === 0) {
            firstOccurrence[charCode] = i + 1;
        }

        lastOccurrence[charCode] = i + 1;
    }

    let specialCharCount = 0;
    const LOWERCASE_A = 'a'.charCodeAt(0);
    const UPPERCASE_A = 'A'.charCodeAt(0);

    for (let i = 0; i < 26; i++) {
        const lowercaseCode = LOWERCASE_A + i;
        const uppercaseCode = UPPERCASE_A + i;

        if (
            lastOccurrence[lowercaseCode] > 0 &&
            firstOccurrence[uppercaseCode] > 0 &&
            lastOccurrence[lowercaseCode] < firstOccurrence[uppercaseCode]
        ) {
            specialCharCount++;
        }
    }

    return specialCharCount;
}