var licenseKeyFormatting = function(s, k) {
    const stringLength = s.length;

    const dashMatches = s.match(/-/g);
    const dashCount = dashMatches ? dashMatches.length : 0;

    const totalCharacters = stringLength - dashCount;
    let firstGroupSize = totalCharacters % k || k;

    const result = [];

    for (let index = 0; index < stringLength; index++) {
        const currentChar = s[index];

        if (currentChar === '-') {
            continue;
        }

        result.push(currentChar.toUpperCase());

        firstGroupSize--;

        if (firstGroupSize === 0) {
            firstGroupSize = k;

            if (index !== stringLength - 1) {
                result.push('-');
            }
        }
    }

    while (result[result.length - 1] === '-') {
        result.pop();
    }

    return result.join('');
};