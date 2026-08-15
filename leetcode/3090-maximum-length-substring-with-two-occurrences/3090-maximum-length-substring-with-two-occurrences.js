/**
 * Finds the maximum length of a substring where
 * each character appears at most twice.
 *
 * @param {string} s
 * @returns {number}
 */
function maximumLengthSubstring(s) {
    // 최대 길이
    let maxLength = 0;

    // 각 문자(a-z)의 등장 횟수
    const charCount = new Array(26).fill(0);

    // Sliding Window의 왼쪽 포인터
    let leftPointer = 0;

    for (let rightPointer = 0; rightPointer < s.length; rightPointer++) {
        // 현재 문자의 인덱스
        const currentCharIndex =
            s.charCodeAt(rightPointer) - 'a'.charCodeAt(0);

        // 현재 문자 개수 증가
        charCount[currentCharIndex]++;

        // 현재 문자가 2번을 초과하면 왼쪽을 이동
        while (charCount[currentCharIndex] > 2) {
            const leftCharIndex =
                s.charCodeAt(leftPointer) - 'a'.charCodeAt(0);

            charCount[leftCharIndex]--;
            leftPointer++;
        }

        // 현재 Window의 길이
        const currentWindowSize =
            rightPointer - leftPointer + 1;

        maxLength = Math.max(maxLength, currentWindowSize);
    }

    return maxLength;
}