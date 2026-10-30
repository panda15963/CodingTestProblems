/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {string}
 */
var findLongestWord = function(s, dictionary) {
    const isSubsequence = (word, targetString) => {
        let wordIndex = 0;

        for (
            let targetIndex = 0;
            wordIndex < word.length && targetIndex < targetString.length;
            targetIndex++
        ) {
            if (word[wordIndex] === targetString[targetIndex]) {
                wordIndex++;
            }
        }

        return wordIndex === word.length;
    };

    let longestWord = '';

    for (const currentWord of dictionary) {
        const currentWordLength = currentWord.length;
        const longestWordLength = longestWord.length;

        if (
            isSubsequence(currentWord, s) &&
            (
                currentWordLength > longestWordLength ||
                (
                    currentWordLength === longestWordLength &&
                    currentWord < longestWord
                )
            )
        ) {
            longestWord = currentWord;
        }
    }

    return longestWord;
};