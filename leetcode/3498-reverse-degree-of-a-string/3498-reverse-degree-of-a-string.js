function reverseDegree(s) {
    let totalScore = 0;

    for (let position = 1; position <= s.length; position++) {
        const currentChar = s.charAt(position - 1);

        const reverseAlphabeticalValue =
            26 - (currentChar.charCodeAt(0) - 'a'.charCodeAt(0));

        totalScore += position * reverseAlphabeticalValue;
    }

    return totalScore;
}