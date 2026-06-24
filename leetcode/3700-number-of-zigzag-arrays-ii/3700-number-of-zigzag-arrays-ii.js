var zigZagArrays = function(n, l, r) {
    const MOD = 1000000007n;

    const M = r - l + 1;
    const size = 2 * M;

    if (n === 1) {
        return M;
    }

    const transition = Array.from(
        { length: size },
        () => Array(size).fill(0n)
    );

    for (let x = 0; x < M; x++) {
        for (let y = x + 1; y < M; y++) {
            transition[x][M + y] = 1n;
        }

        for (let y = 0; y < x; y++) {
            transition[M + x][y] = 1n;
        }
    }

    const resultMatrix = matrixPower(transition, BigInt(n - 1));

    let totalWays = 0n;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            totalWays = (totalWays + resultMatrix[i][j]) % MOD;
        }
    }

    return Number(totalWays);

    function matrixPower(base, exp) {
        const N = base.length;

        let result = Array.from(
            { length: N },
            (_, i) =>
                Array.from(
                    { length: N },
                    (_, j) => (i === j ? 1n : 0n)
                )
        );

        let cur = base;

        while (exp > 0n) {
            if (exp & 1n) {
                result = multiply(result, cur);
            }

            cur = multiply(cur, cur);
            exp >>= 1n;
        }

        return result;
    }

    function multiply(A, B) {
        const N = A.length;

        const C = Array.from(
            { length: N },
            () => Array(N).fill(0n)
        );

        for (let i = 0; i < N; i++) {
            for (let k = 0; k < N; k++) {
                if (A[i][k] === 0n) continue;

                for (let j = 0; j < N; j++) {
                    if (B[k][j] === 0n) continue;

                    C[i][j] =
                        (C[i][j] + A[i][k] * B[k][j]) % MOD;
                }
            }
        }

        return C;
    }
};