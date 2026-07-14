var subsequencePairCount = function(nums) {
    const MOD = 1_000_000_007;
    const MAX = 201;
    const SIZE = MAX * MAX;

    function gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }

        return a;
    }

    // GCD 미리 계산
    const gcdTable = Array.from(
        { length: MAX },
        () => new Int16Array(MAX)
    );

    for (let i = 0; i < MAX; i++) {
        for (let j = 0; j < MAX; j++) {
            gcdTable[i][j] = gcd(i, j);
        }
    }

    let dp = new Int32Array(SIZE);
    dp[0] = 1;

    for (const num of nums) {
        const next = new Int32Array(SIZE);

        for (let g1 = 0; g1 < MAX; g1++) {
            const base = g1 * MAX;

            for (let g2 = 0; g2 < MAX; g2++) {
                const index = base + g2;
                const count = dp[index];

                if (count === 0) {
                    continue;
                }

                // 1. 현재 숫자를 선택하지 않음
                let value = next[index] + count;

                if (value >= MOD) {
                    value -= MOD;
                }

                next[index] = value;

                // 2. 첫 번째 부분 수열에 추가
                const nextG1 = gcdTable[g1][num];
                const index1 = nextG1 * MAX + g2;

                value = next[index1] + count;

                if (value >= MOD) {
                    value -= MOD;
                }

                next[index1] = value;

                // 3. 두 번째 부분 수열에 추가
                const nextG2 = gcdTable[g2][num];
                const index2 = base + nextG2;

                value = next[index2] + count;

                if (value >= MOD) {
                    value -= MOD;
                }

                next[index2] = value;
            }
        }

        dp = next;
    }

    let answer = 0;

    for (let g = 1; g < MAX; g++) {
        answer += dp[g * MAX + g];

        if (answer >= MOD) {
            answer -= MOD;
        }
    }

    return answer;
};