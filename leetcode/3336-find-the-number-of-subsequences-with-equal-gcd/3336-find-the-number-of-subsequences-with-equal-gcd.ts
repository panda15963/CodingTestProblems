function subsequencePairCount(nums: number[]): number {
    const MOD: number = 1_000_000_007;
    const MAX: number = 201;
    const SIZE: number = MAX * MAX;

    function gcd(a: number, b: number): number {
        while (b !== 0) {
            const temp: number = b;
            b = a % b;
            a = temp;
        }

        return a;
    }

    // GCD 미리 계산
    const gcdTable: Int16Array[] = Array.from(
        { length: MAX },
        (): Int16Array => new Int16Array(MAX)
    );

    for (let i = 0; i < MAX; i++) {
        for (let j = 0; j < MAX; j++) {
            gcdTable[i][j] = gcd(i, j);
        }
    }

    let dp: Int32Array = new Int32Array(SIZE);

    // dp[0][0] = 1
    dp[0] = 1;

    for (const num of nums) {
        const next: Int32Array = new Int32Array(SIZE);

        for (let g1 = 0; g1 < MAX; g1++) {
            const base: number = g1 * MAX;

            for (let g2 = 0; g2 < MAX; g2++) {
                const index: number = base + g2;
                const count: number = dp[index];

                if (count === 0) {
                    continue;
                }

                // 1. 현재 숫자를 선택하지 않음
                let value: number = next[index] + count;

                if (value >= MOD) {
                    value -= MOD;
                }

                next[index] = value;

                // 2. 첫 번째 부분 수열에 추가
                const nextG1: number = gcdTable[g1][num];
                const index1: number = nextG1 * MAX + g2;

                value = next[index1] + count;

                if (value >= MOD) {
                    value -= MOD;
                }

                next[index1] = value;

                // 3. 두 번째 부분 수열에 추가
                const nextG2: number = gcdTable[g2][num];
                const index2: number = base + nextG2;

                value = next[index2] + count;

                if (value >= MOD) {
                    value -= MOD;
                }

                next[index2] = value;
            }
        }

        dp = next;
    }

    let answer: number = 0;

    for (let g = 1; g < MAX; g++) {
        answer += dp[g * MAX + g];

        if (answer >= MOD) {
            answer -= MOD;
        }
    }

    return answer;
}