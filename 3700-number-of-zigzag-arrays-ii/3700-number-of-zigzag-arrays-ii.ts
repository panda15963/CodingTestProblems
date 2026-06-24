const MOD = 1000000007n;

function zigZagArrays(
    n: number,
    l: number,
    r: number
): number {
    const M = r - l + 1;
    const size = 2 * M;

    // 길이 1
    if (n === 1) {
        return M;
    }

    // 전이 행렬 생성
    const transition: bigint[][] = Array.from(
        { length: size },
        () => Array(size).fill(0n)
    );

    for (let x = 0; x < M; x++) {
        // 증가 상태 -> 감소 상태
        for (let y = x + 1; y < M; y++) {
            transition[x][M + y] = 1n;
        }

        // 감소 상태 -> 증가 상태
        for (let y = 0; y < x; y++) {
            transition[M + x][y] = 1n;
        }
    }

    const resultMatrix = matrixPower(
        transition,
        BigInt(n - 1)
    );

    let totalWays = 0n;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            totalWays =
                (totalWays + resultMatrix[i][j]) % MOD;
        }
    }

    return Number(totalWays);
}

function matrixPower(
    base: bigint[][],
    exp: bigint
): bigint[][] {
    const n = base.length;

    let result: bigint[][] = Array.from(
        { length: n },
        (_, i) =>
            Array.from(
                { length: n },
                (_, j) => (i === j ? 1n : 0n)
            )
    );

    let current = base;

    while (exp > 0n) {
        if ((exp & 1n) === 1n) {
            result = multiply(result, current);
        }

        current = multiply(current, current);
        exp >>= 1n;
    }

    return result;
}

function multiply(
    A: bigint[][],
    B: bigint[][]
): bigint[][] {
    const n = A.length;

    const C: bigint[][] = Array.from(
        { length: n },
        () => Array(n).fill(0n)
    );

    for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
            if (A[i][k] === 0n) continue;

            for (let j = 0; j < n; j++) {
                if (B[k][j] === 0n) continue;

                C[i][j] =
                    (C[i][j] +
                        (A[i][k] * B[k][j]) % MOD) %
                    MOD;
            }
        }
    }

    return C;
}