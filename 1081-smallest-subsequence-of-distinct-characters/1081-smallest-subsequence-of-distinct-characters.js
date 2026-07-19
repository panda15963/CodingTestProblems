/**
 * Finds the lexicographically smallest subsequence that contains all unique characters.
 *
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function(s) {
    /**
     * Converts a character to its index (0-25).
     *
     * @param {string} char
     * @return {number}
     */
    const charToIndex = (char) => {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    };

    // Record the last occurrence of each character
    const lastOccurrence = new Array(26).fill(0);

    for (const [index, char] of [...s].entries()) {
        lastOccurrence[charToIndex(char)] = index;
    }

    // Stack to build the answer
    const stack = [];

    // Bitmask indicating which characters are already in the stack
    let charPresenceMask = 0;

    // Process each character
    for (const [currentIndex, currentChar] of [...s].entries()) {
        const currentCharIndex = charToIndex(currentChar);

        // Skip if already in the stack
        if ((charPresenceMask >> currentCharIndex) & 1) {
            continue;
        }

        // Remove larger characters that will appear again later
        while (
            stack.length > 0 &&
            stack[stack.length - 1] > currentChar &&
            lastOccurrence[
                charToIndex(stack[stack.length - 1])
            ] > currentIndex
        ) {
            const removedChar = stack.pop();
            charPresenceMask ^= 1 << charToIndex(removedChar);
        }

        // Add current character
        stack.push(currentChar);
        charPresenceMask |= 1 << currentCharIndex;
    }

    return stack.join("");
};