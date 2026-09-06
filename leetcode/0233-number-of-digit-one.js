/**
 * Counts the total number of digit 1 appearing in all
 * non-negative integers from 0 to n.
 *
 * @param {number} n
 * @return {number}
 */
function countDigitOne(n) {
    // 숫자를 문자열로 변환
    const numberString = n.toString();
    const digitCount = numberString.length;

    // 메모이제이션 테이블
    const memo = Array.from(
        { length: digitCount },
        () => Array(digitCount).fill(-1)
    );

    /**
     * @param {number} position 현재 자릿수 위치
     * @param {number} onesCount 현재까지 등장한 1의 개수
     * @param {boolean} isLimit n의 범위에 제한되는지 여부
     * @return {number}
     */
    const dfs = (position, onesCount, isLimit) => {
        // 모든 자릿수를 확인한 경우
        if (position >= digitCount) {
            return onesCount;
        }

        // 제한이 없는 경우 메모이제이션 확인
        if (!isLimit && memo[position][onesCount] !== -1) {
            return memo[position][onesCount];
        }

        // 현재 위치에서 선택할 수 있는 최대 숫자
        const maxDigit = isLimit
            ? parseInt(numberString[position])
            : 9;

        let totalCount = 0;

        // 가능한 모든 숫자 탐색
        for (let digit = 0; digit <= maxDigit; digit++) {
            totalCount += dfs(
                position + 1,
                onesCount + (digit === 1 ? 1 : 0),
                isLimit && digit === maxDigit
            );
        }

        // 제한이 없는 경우 결과 저장
        if (!isLimit) {
            memo[position][onesCount] = totalCount;
        }

        return totalCount;
    };

    return dfs(0, 0, true);
}