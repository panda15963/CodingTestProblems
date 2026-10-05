var scoreOfParentheses = function(s) {
    let totalScore = 0;
    let depth = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            depth++;
        } else {
            depth--;

            if (s[i - 1] === '(') {
                totalScore += (1 << depth);
            }
        }
    }

    return totalScore;
};