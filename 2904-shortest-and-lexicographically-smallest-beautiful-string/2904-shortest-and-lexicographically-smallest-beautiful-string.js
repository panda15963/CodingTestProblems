/**
 * Finds the shortest beautiful substring containing exactly k '1's.
 * If multiple substrings have the same length, returns the lexicographically smallest one.
 *
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
function shortestBeautifulSubstring(s, k) {
    const stringLength = s.length;
    let shortestSubstring = '';

    // 모든 시작 위치 탐색
    for (let startIndex = 0; startIndex < stringLength; startIndex++) {

        // 최소 길이가 k인 부분 문자열부터 탐색
        for (
            let endIndex = startIndex + k;
            endIndex <= stringLength;
            endIndex++
        ) {
            // 현재 부분 문자열
            const currentSubstring = s.slice(startIndex, endIndex);

            // 현재 부분 문자열의 1 개수 계산
            const onesCount = currentSubstring
                .split('')
                .filter(char => char === '1')
                .length;

            // 조건을 만족하는지 확인
            const isValidSubstring = onesCount === k;

            const isFirstValid = shortestSubstring === '';

            const isShorter =
                endIndex - startIndex < shortestSubstring.length;

            const isSameLengthButSmaller =
                endIndex - startIndex === shortestSubstring.length &&
                currentSubstring < shortestSubstring;

            // 정답 갱신
            if (
                isValidSubstring &&
                (isFirstValid || isShorter || isSameLengthButSmaller)
            ) {
                shortestSubstring = currentSubstring;
            }
        }
    }

    return shortestSubstring;
}