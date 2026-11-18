/**
 * Calculates the minimum number of changes needed to make
 * consecutive even-odd position pairs have identical characters.
 *
 * @param {string} s - The input string
 * @returns {number} The minimum number of changes needed
 */
function minChanges(s) {
    // 변경이 필요한 횟수
    let changeCount = 0;

    // 홀수 인덱스(1, 3, 5, ...) 순회
    for (let i = 1; i < s.length; i += 2) {
        // 현재 문자와 이전 문자가 다르면 변경 횟수 증가
        if (s[i] !== s[i - 1]) {
            changeCount++;
        }
    }

    return changeCount;
}