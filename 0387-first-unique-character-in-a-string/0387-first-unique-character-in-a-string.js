var firstUniqChar = function(s) {
    const characterFrequency = new Map();

    for (const character of s) {
        const currentCount =
            characterFrequency.get(character) || 0;

        characterFrequency.set(
            character,
            currentCount + 1
        );
    }

    for (let index = 0; index < s.length; index++) {
        const currentCharacter = s[index];

        if (characterFrequency.get(currentCharacter) === 1) {
            return index;
        }
    }

    return -1;
};