/**
 * Detects if the capitalization of a word follows valid patterns.
 *
 * Valid patterns:
 * 1. All letters are uppercase (e.g., "USA")
 * 2. All letters are lowercase (e.g., "leetcode")
 * 3. Only the first letter is uppercase (e.g., "Google")
 *
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {
    // Count the number of uppercase letters
    const uppercaseCount = word
        .split('')
        .reduce((accumulator, character) => {
            return accumulator +
                (character === character.toUpperCase() ? 1 : 0);
        }, 0);

    // Check the three valid capitalization patterns
    return uppercaseCount === 0 ||
           uppercaseCount === word.length ||
           (uppercaseCount === 1 && word[0] === word[0].toUpperCase());
};