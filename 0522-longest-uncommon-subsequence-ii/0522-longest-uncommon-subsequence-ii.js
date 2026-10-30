/**
 * Checks whether sub is a subsequence of main.
 * @param {string} main
 * @param {string} sub
 * @return {boolean}
 */
function isSubsequence(main, sub) {
    let subIndex = 0;

    for (let i = 0; i < main.length && subIndex < sub.length; i++) {
        if (main.charAt(i) === sub.charAt(subIndex)) {
            subIndex++;
        }
    }

    return subIndex === sub.length;
}

/**
 * @param {string[]} strs
 * @return {number}
 */
var findLUSlength = function(strs) {
    let longestUncommonLength = -1;

    for (let i = 0, n = strs.length; i < n; i++) {
        let j;

        for (j = 0; j < n; j++) {
            if (i === j) continue;

            if (isSubsequence(strs[j], strs[i])) {
                break;
            }
        }

        if (j === n) {
            longestUncommonLength = Math.max(
                longestUncommonLength,
                strs[i].length
            );
        }
    }

    return longestUncommonLength;
};