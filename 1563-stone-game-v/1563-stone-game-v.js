/**
 * Solves the Stone Game V problem using dynamic programming with memoization.
 *
 * @param {number[]} stoneValue
 * @returns {number}
 */
function stoneGameV(stoneValue) {
    const n = stoneValue.length;

    // Prefix sum
    const prefixSum = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
    }

    // Memoization table
    const memo = Array.from(
        { length: n },
        () => new Array(n).fill(-1)
    );

    /**
     * @param {number} left
     * @param {number} right
     * @returns {number}
     */
    const dfs = (left, right) => {
        // 돌이 하나이거나 범위가 잘못된 경우
        if (left >= right) {
            return 0;
        }

        // 이미 계산한 경우
        if (memo[left][right] !== -1) {
            return memo[left][right];
        }

        let maxScore = 0;

        // 처음에는 전체 구간의 합
        let leftSum = 0;
        let rightSum = prefixSum[right + 1] - prefixSum[left];

        // 모든 분할 위치를 확인
        for (let splitPos = left; splitPos < right; splitPos++) {
            // 왼쪽 구간에 현재 돌 추가
            leftSum += stoneValue[splitPos];

            // 오른쪽 구간에서 현재 돌 제거
            rightSum -= stoneValue[splitPos];

            if (leftSum < rightSum) {
                // 왼쪽 합이 더 작음
                if (maxScore > leftSum * 2) {
                    continue;
                }

                maxScore = Math.max(
                    maxScore,
                    leftSum + dfs(left, splitPos)
                );

            } else if (leftSum > rightSum) {
                // 오른쪽 합이 더 작음
                if (maxScore > rightSum * 2) {
                    break;
                }

                maxScore = Math.max(
                    maxScore,
                    rightSum + dfs(splitPos + 1, right)
                );

            } else {
                // 양쪽 합이 같음
                maxScore = Math.max(
                    maxScore,
                    leftSum + dfs(left, splitPos),
                    rightSum + dfs(splitPos + 1, right)
                );
            }
        }

        // 결과 저장
        memo[left][right] = maxScore;

        return maxScore;
    };

    return dfs(0, n - 1);
}