/**
 * Finds the bitwise AND of all numbers in the range [left, right].
 *
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
function rangeBitwiseAnd(left, right) {
    // right의 가장 오른쪽 1비트를 계속 제거
    while (left < right) {
        right &= right - 1;
    }

    return right;
}