var minAddToMakeValid = function(s) {
    const unmatchedParentheses = [];

    for (const character of s) {
        if (
            character === ')' &&
            unmatchedParentheses.length > 0 &&
            unmatchedParentheses[unmatchedParentheses.length - 1] === '('
        ) {
            unmatchedParentheses.pop();
        } else {
            unmatchedParentheses.push(character);
        }
    }

    return unmatchedParentheses.length;
};