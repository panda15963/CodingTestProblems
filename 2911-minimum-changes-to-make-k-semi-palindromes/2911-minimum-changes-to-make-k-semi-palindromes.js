/**
 * Finds the minimum number of character changes needed
 * to partition string s into k semi-palindromes.
 *
 * @param {string} s - The input string
 * @param {number} k - The number of partitions required
 * @returns {number} The minimum number of changes needed
 */
function minimumChanges(s, k) {
    const stringLength = s.length;

    // dp[i][j]: i부터 j까지의 부분 문자열을
    // 세미 팰린드롬으로 만들기 위한 최소 변경 횟수
    const minChangesForSubstring = Array.from(
        { length: stringLength + 1 },
        () => Array(stringLength + 1).fill(Infinity)
    );

    // dp[i][j]: 처음 i개의 문자를 j개의 그룹으로 나누는
    // 최소 변경 횟수
    const minChangesForPartition = Array.from(
        { length: stringLength + 1 },
        () => Array(k + 1).fill(Infinity)
    );

    // 초기 상태: 문자 0개를 그룹 0개로 나누는 비용은 0
    minChangesForPartition[0][0] = 0;

    // 각 부분 문자열을 세미 팰린드롬으로 만드는 최소 변경 횟수 계산
    for (let startIdx = 1; startIdx <= stringLength; ++startIdx) {
        for (let endIdx = 1; endIdx <= stringLength; ++endIdx) {
            const substringLength = endIdx - startIdx + 1;

            // 부분 문자열 길이의 모든 약수 탐색
            for (let divisor = 1; divisor < substringLength; ++divisor) {
                if (substringLength % divisor === 0) {
                    let changesNeeded = 0;

                    // 세미 팰린드롬 구조에서 서로 일치해야 하는 문자 비교
                    for (let leftPos = 0; leftPos < substringLength; ++leftPos) {
                        const groupsCount = Math.floor(substringLength / divisor);

                        const rightPos =
                            (groupsCount - 1 - Math.floor(leftPos / divisor)) * divisor
                            + (leftPos % divisor);

                        // 중복 계산 방지
                        if (leftPos >= rightPos) {
                            break;
                        }

                        // 문자가 다르면 변경 횟수 증가
                        if (
                            s[startIdx - 1 + leftPos] !==
                            s[startIdx - 1 + rightPos]
                        ) {
                            ++changesNeeded;
                        }
                    }

                    // 최소 변경 횟수 갱신
                    minChangesForSubstring[startIdx][endIdx] = Math.min(
                        minChangesForSubstring[startIdx][endIdx],
                        changesNeeded
                    );
                }
            }
        }
    }

    // 동적 계획법으로 문자열을 k개의 그룹으로 분할
    for (let currentPos = 1; currentPos <= stringLength; ++currentPos) {
        for (let partitionCount = 1; partitionCount <= k; ++partitionCount) {

            // 이전 그룹이 끝나는 모든 위치 탐색
            for (
                let prevPartitionEnd = 0;
                prevPartitionEnd < currentPos - 1;
                ++prevPartitionEnd
            ) {
                minChangesForPartition[currentPos][partitionCount] = Math.min(
                    minChangesForPartition[currentPos][partitionCount],

                    minChangesForPartition[prevPartitionEnd][partitionCount - 1] +
                    minChangesForSubstring[prevPartitionEnd + 1][currentPos]
                );
            }
        }
    }

    // 전체 문자열을 k개의 그룹으로 나누는 최소 변경 횟수 반환
    return minChangesForPartition[stringLength][k];
}