/**
 * @param {string} s
 * @return {string}
 */
function smallestPalindrome(s) {
    const n = s.length;
    const sortedHalf = getSortedHalf(s);

    return (
        sortedHalf +
        (n % 2 === 1 ? s[Math.floor(n / 2)] : "") +
        reversed(sortedHalf)
    );
}

/**
 * @param {string} s
 * @return {string}
 */
function getSortedHalf(s) {
    const half = s.substring(0, Math.floor(s.length / 2));
    return half.split("").sort().join("");
}

/**
 * @param {string} s
 * @return {string}
 */
function reversed(s) {
    return s.split("").reverse().join("");
}