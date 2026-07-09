function solution(n) {
    // 홀수면 만들 수 없음
    if (n % 2 !== 0) {
        return 0;
    }

    const MOD = 1000000007;

    // DP 배열
    const tile = new Array(n + 1).fill(0);

    tile[0] = 1;
    tile[2] = 3;

    // 짝수만 계산
    for (let i = 4; i <= n; i += 2) {
        // 기본 경우
        tile[i] = (tile[i - 2] * 3) % MOD;

        // 특수 경우
        for (let j = i - 4; j >= 0; j -= 2) {
            tile[i] = (tile[i] + tile[j] * 2) % MOD;
        }
    }

    return tile[n];
}