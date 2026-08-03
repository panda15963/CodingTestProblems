/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
function isInterleave(s1, s2, s3) {
    if (s3.length !== s1.length + s2.length) {
        return false;
    }

    // Memoization table
    const memory = Array.from(
        { length: s2.length + 1 },
        () => new Array(s3.length + 1).fill(null)
    );

    function check(s1Index, s2Index, s3Index) {
        // Reached end of s1
        if (s1Index === s1.length) {
            return s2.substring(s2Index) === s3.substring(s3Index);
        }

        // Reached end of s2
        if (s2Index === s2.length) {
            return s1.substring(s1Index) === s3.substring(s3Index);
        }

        // Already computed
        if (memory[s2Index][s3Index] !== null) {
            return memory[s2Index][s3Index];
        }

        let result = false;

        // Match with s1
        if (s3[s3Index] === s1[s1Index]) {
            result = check(s1Index + 1, s2Index, s3Index + 1);
        }

        // Match with s2
        if (s3[s3Index] === s2[s2Index]) {
            result = result || check(s1Index, s2Index + 1, s3Index + 1);
        }

        memory[s2Index][s3Index] = result;
        return result;
    }

    return check(0, 0, 0);
}