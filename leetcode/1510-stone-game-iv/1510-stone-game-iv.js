var winnerSquareGame = function (n) {
    // dp[i] := i개의 돌이 있을 때 현재 플레이어가 이길 수 있는지
    const dp = new Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            // j^2개의 돌을 가져간 후 상대가 지는 경우
            if (!dp[i - j * j]) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
};