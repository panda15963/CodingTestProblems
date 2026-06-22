function maxNumberOfBalloons(text) {
    // Create an array to count occurrences of each letter (a-z)
    const letterCount = new Array(26).fill(0);

    // Count the frequency of each character in the input text
    for (const character of text) {
        const index = character.charCodeAt(0) - 97;
        letterCount[index]++;
    }

    // The word "balloon" contains: b(1), a(1), l(2), o(2), n(1)
    const countA = letterCount[0];        // 'a'
    const countB = letterCount[1];        // 'b'
    const countL = letterCount[11] >> 1;  // 'l' / 2
    const countO = letterCount[14] >> 1;  // 'o' / 2
    const countN = letterCount[13];       // 'n'

    return Math.min(countA, countB, countL, countO, countN);
}