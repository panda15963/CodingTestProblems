/**
 * Stone Game II - Dynamic Programming with Memoization
 *
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
    const numPiles = piles.length;

    // memo[i][m] =
    // i번째 pile부터 시작하고 M = m일 때
    // 현재 플레이어가 얻을 수 있는 최대 돌의 개수
    const memo = Array.from(
        { length: numPiles },
        () => new Array(numPiles + 1).fill(0)
    );

    // Prefix Sum
    // prefixSum[i] = piles[0] ~ piles[i - 1]의 합
    const prefixSum = new Array(numPiles + 1).fill(0);

    for (let i = 0; i < numPiles; i++) {
        prefixSum[i + 1] = prefixSum[i] + piles[i];
    }

    /**
     * @param {number} startIndex
     * @param {number} currentM
     * @return {number}
     */
    const dfs = (startIndex, currentM) => {
        // 남은 모든 pile을 가져갈 수 있다면 전부 가져감
        if (currentM * 2 >= numPiles - startIndex) {
            return prefixSum[numPiles] - prefixSum[startIndex];
        }

        // 이미 계산한 상태라면 반환
        if (memo[startIndex][currentM] !== 0) {
            return memo[startIndex][currentM];
        }

        let maxStones = 0;

        // 1개부터 2M개까지 가져가는 경우를 모두 확인
        for (let x = 1; x <= currentM * 2; x++) {
            // 현재 남은 전체 돌의 개수
            const totalRemaining =
                prefixSum[numPiles] - prefixSum[startIndex];

            // 현재 플레이어가 x개를 가져간 후
            // 상대방이 최적으로 얻을 수 있는 돌의 개수
            const opponentStones = dfs(
                startIndex + x,
                Math.max(currentM, x)
            );

            // 내가 얻을 수 있는 최대 돌의 개수
            maxStones = Math.max(
                maxStones,
                totalRemaining - opponentStones
            );
        }

        // 결과 저장
        memo[startIndex][currentM] = maxStones;

        return maxStones;
    };

    // Alice부터 시작, M = 1
    return dfs(0, 1);
};