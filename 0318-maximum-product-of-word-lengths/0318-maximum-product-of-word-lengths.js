var maxProduct = function(words) {
    const wordCount = words.length;
    const characterMasks = new Array(wordCount).fill(0);
    let maxProductValue = 0;

    for (let currentIndex = 0; currentIndex < wordCount; ++currentIndex) {
        for (const character of words[currentIndex]) {
            const bitPosition = character.charCodeAt(0) - 97;
            characterMasks[currentIndex] |= 1 << bitPosition;
        }

        for (let previousIndex = 0; previousIndex < currentIndex; ++previousIndex) {
            if (
                (characterMasks[currentIndex] & characterMasks[previousIndex]) === 0
            ) {
                const currentProduct =
                    words[currentIndex].length * words[previousIndex].length;

                maxProductValue = Math.max(
                    maxProductValue,
                    currentProduct
                );
            }
        }
    }

    return maxProductValue;
};