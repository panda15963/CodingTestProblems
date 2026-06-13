function mapWordWeights(words, weights) {
    let result = "";

    for (const word of words) {
        let totalWeight = 0;

        // Calculate the total weight of characters in the word
        for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            totalWeight += weights[ch.charCodeAt(0) - 'a'.charCodeAt(0)];
        }

        // Apply modulo 26 to fit inside alphabet range
        const modValue = totalWeight % 26;

        // Reverse alphabetical mapping: 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
        const mappedChar = String.fromCharCode('z'.charCodeAt(0) - modValue);

        result += mappedChar;
    }

    return result;
}