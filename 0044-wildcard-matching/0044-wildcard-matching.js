/**
 * Checks if a string matches a pattern with wildcard support.
 *
 * '?' matches any single character.
 * '*' matches any sequence of characters (including empty).
 *
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const stringLength = s.length;
    const patternLength = p.length;

    // -1 = unvisited
    //  0 = false
    //  1 = true
    const memoTable = Array.from(
        { length: stringLength + 1 },
        () => Array(patternLength + 1).fill(-1)
    );

    const matchHelper = (stringIndex, patternIndex) => {
        // End of string
        if (stringIndex >= stringLength) {
            return (
                patternIndex >= patternLength ||
                (p[patternIndex] === "*" &&
                    matchHelper(stringIndex, patternIndex + 1))
            );
        }

        // End of pattern
        if (patternIndex >= patternLength) {
            return false;
        }

        // Memoized result
        if (memoTable[stringIndex][patternIndex] !== -1) {
            return memoTable[stringIndex][patternIndex] === 1;
        }

        let matchResult;

        if (p[patternIndex] === "*") {
            // '*' matches one character or empty string
            matchResult =
                matchHelper(stringIndex + 1, patternIndex) ||
                matchHelper(stringIndex, patternIndex + 1);
        } else {
            // '?' or exact character match
            matchResult =
                (p[patternIndex] === "?" ||
                    s[stringIndex] === p[patternIndex]) &&
                matchHelper(stringIndex + 1, patternIndex + 1);
        }

        memoTable[stringIndex][patternIndex] = matchResult ? 1 : 0;
        return matchResult;
    };

    return matchHelper(0, 0);
};