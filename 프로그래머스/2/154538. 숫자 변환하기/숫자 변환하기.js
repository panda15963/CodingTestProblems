function solution(x, y, n) {
    // dp[i]는 i를 만드는 최소 연산 횟수, 초기값은 -1(도달 불가)
    const dp = new Array(y + 1).fill(-1);
    dp[x] = 0; // x에서 시작하므로 x를 만드는 횟수는 0

    for (let i = x; i <= y; i++) {
        if (dp[i] === -1) continue; // 도달할 수 없는 숫자는 건너뜀

        // 3가지 연산 적용 (i+n, i*2, i*3)
        // 현재 위치(dp[i])에서 1회 연산(+1)한 값과 기존 저장된 값(dp[next]) 비교
        
        // 1. n 더하기
        if (i + n <= y) {
            dp[i + n] = dp[i + n] === -1 ? dp[i] + 1 : Math.min(dp[i + n], dp[i] + 1);
        }
        // 2. 2 곱하기
        if (i * 2 <= y) {
            dp[i * 2] = dp[i * 2] === -1 ? dp[i] + 1 : Math.min(dp[i * 2], dp[i] + 1);
        }
        // 3. 3 곱하기
        if (i * 3 <= y) {
            dp[i * 3] = dp[i * 3] === -1 ? dp[i] + 1 : Math.min(dp[i * 3], dp[i] + 1);
        }
    }

    return dp[y];
}
