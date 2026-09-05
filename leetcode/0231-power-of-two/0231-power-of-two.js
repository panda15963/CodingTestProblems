/**
 * Determines if a given number is a power of two.
 *
 * @param {number} n - The number to check
 * @returns {boolean} true if n is a power of two, false otherwise
 */
function isPowerOfTwo(n) {
    // n이 양수이고 이진수에서 1비트만 설정되어 있는지 확인
    return n > 0 && (n & (n - 1)) === 0;
}