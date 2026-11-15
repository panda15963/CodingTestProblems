/**
 * Counts the number of integers from 0 to n that don't have consecutive 1s
 * in binary representation.
 *
 * @param {number} n - The upper bound integer
 * @returns {number} The count of valid integers without consecutive 1s
 */
function findIntegers(n) {
    // n을 이진수로 표현하는 데 필요한 비트 길이
    const bitLength = n.toString(2).length;

    // 메모이제이션 테이블: dp[position][previousBit]
    const memoTable = Array.from(
        { length: bitLength },
        () => Array(2).fill(-1)
    );

    /**
     * Digit DP를 활용한 DFS
     * @param {number} position - 현재 비트 위치
     * @param {number} previousBit - 이전 비트 값
     * @param {boolean} isLimit - 현재까지 n의 범위에 제한되어 있는지 여부
     * @returns {number} 조건을 만족하는 정수의 개수
     */
    const countValidIntegers = (position, previousBit, isLimit) => {
        // 모든 비트를 처리한 경우
        if (position < 0) {
            return 1;
        }

        // 범위 제한이 없고 이미 계산한 상태라면 메모이제이션 결과 반환
        if (!isLimit && memoTable[position][previousBit] !== -1) {
            return memoTable[position][previousBit];
        }

        // 현재 위치에 배치할 수 있는 최대 비트 값
        const maxBitValue = isLimit
            ? (n >> position) & 1
            : 1;

        let totalCount = 0;

        // 현재 비트에 0 또는 1 배치
        for (let currentBit = 0; currentBit <= maxBitValue; currentBit++) {
            // 연속된 1이 만들어지는 경우 제외
            if (previousBit === 1 && currentBit === 1) {
                continue;
            }

            // 다음 비트 위치로 이동하며 재귀 호출
            totalCount += countValidIntegers(
                position - 1,
                currentBit,
                isLimit && currentBit === maxBitValue
            );
        }

        // 범위 제한이 없는 상태라면 결과 저장
        if (!isLimit) {
            memoTable[position][previousBit] = totalCount;
        }

        return totalCount;
    };

    // 가장 왼쪽 비트부터 DFS 시작
    return countValidIntegers(bitLength - 1, 0, true);
}