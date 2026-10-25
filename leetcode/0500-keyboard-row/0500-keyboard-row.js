/**
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(words) {
    const keyboardRowMapping = '12210111011122000010020202';
    const validWords = [];

    for (const word of words) {
        const lowercaseWord = word.toLowerCase();

        const firstCharIndex = lowercaseWord.charCodeAt(0) - 'a'.charCodeAt(0);
        const targetRow = keyboardRowMapping[firstCharIndex];

        let isValidWord = true;

        for (const char of lowercaseWord) {
            const charIndex = char.charCodeAt(0) - 'a'.charCodeAt(0);

            if (keyboardRowMapping[charIndex] !== targetRow) {
                isValidWord = false;
                break;
            }
        }

        if (isValidWord) {
            validWords.push(word);
        }
    }

    return validWords;
}