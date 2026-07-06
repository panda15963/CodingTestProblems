function solution(n, words) {

    const spokenWords = new Map();

    let order = 1;
    let phase = 1;

    let prevWord = words[0][0];

    for (const word of words) {

        if (
            spokenWords.has(word) ||
            prevWord[prevWord.length - 1] !== word[0]
        ) {
            return [order, phase];
        }

        if (order === n) {
            phase++;
        }

        spokenWords.set(word, true);

        prevWord = word;
        order = (order % n) + 1;
    }

    return [0, 0];
}