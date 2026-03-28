function solution(N, number) {
    const MAX = 8;
    const dp = Array(MAX + 1);
    for (let i = 0; i <= MAX; i++) {
        dp[i] = new Set();
    }

    // 1번 사용: N, 2번: NN, 3번: NNN, ...
    let nn = N;
    for (let i = 1; i <= MAX; i++) {
        dp[i].add(nn);
        nn = nn * 10 + N;
    }

    // 1~8번 사용해서 만들 수 있는 모든 수 계산
    for (let i = 1; i <= MAX; i++) {
        for (let j = 1; j < i; j++) {
            for (const a of dp[j]) {
                for (const b of dp[i - j]) {
                    dp[i].add(a + b);
                    dp[i].add(a - b);
                    dp[i].add(b - a);
                    dp[i].add(a * b);
                    if (b !== 0) dp[i].add(Math.floor(a / b));
                    if (a !== 0) dp[i].add(Math.floor(b / a));
                }
            }
        }

        if (dp[i].has(number)) {
            return i;
        }
    }

    return -1;
}