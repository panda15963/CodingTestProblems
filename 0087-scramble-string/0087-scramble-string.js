/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function isScramble(s1, s2) {
    const length = s1.length;

    if (length !== s2.length) {
        return false;
    }

    // memo[i][j][k]
    // -1: not computed
    //  0: false
    //  1: true
    const memo = Array.from({ length }, () =>
        Array.from({ length }, () => Array(length + 1).fill(-1))
    );

    /**
     * @param {number} s1Start
     * @param {number} s2Start
     * @param {number} substringLength
     * @return {boolean}
     */
    function checkScramble(s1Start, s2Start, substringLength) {
        if (memo[s1Start][s2Start][substringLength] !== -1) {
            return memo[s1Start][s2Start][substringLength] === 1;
        }

        // Base case
        if (substringLength === 1) {
            const result = s1[s1Start] === s2[s2Start];
            memo[s1Start][s2Start][substringLength] = result ? 1 : 0;
            return result;
        }

        // Try every possible split
        for (let splitPoint = 1; splitPoint < substringLength; splitPoint++) {
            const remainingLength = substringLength - splitPoint;

            // No swap
            if (
                checkScramble(s1Start, s2Start, splitPoint) &&
                checkScramble(
                    s1Start + splitPoint,
                    s2Start + splitPoint,
                    remainingLength
                )
            ) {
                memo[s1Start][s2Start][substringLength] = 1;
                return true;
            }

            // Swap
            if (
                checkScramble(
                    s1Start + splitPoint,
                    s2Start,
                    remainingLength
                ) &&
                checkScramble(
                    s1Start,
                    s2Start + remainingLength,
                    splitPoint
                )
            ) {
                memo[s1Start][s2Start][substringLength] = 1;
                return true;
            }
        }

        memo[s1Start][s2Start][substringLength] = 0;
        return false;
    }

    return checkScramble(0, 0, length);
}