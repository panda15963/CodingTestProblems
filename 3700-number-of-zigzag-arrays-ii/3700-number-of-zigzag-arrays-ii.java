import java.util.Arrays;

public class Solution {
    private static final int MOD = 1_000_000_007;

    public int zigZagArrays(int n, int l, int r) {
        int M = r - l + 1;
        int size = 2 * M;
        
        // Base case: 길이가 1인 배열은 l부터 r까지의 개수 자체가 정답입니다.
        if (n == 1) {
            return M;
        }

        // 1. 전이 행렬(Transition Matrix) 구축
        long[][] transition = new long[size][size];
        for (int x = 0; x < M; x++) {
            // 증가하는 상태 (0, x) -> 다음 상태는 감소하는 상태 (1, y)여야 하며 y > x
            for (int y = x + 1; y < M; y++) {
                transition[x][M + y] = 1;
            }
            // 감소하는 상태 (1, x) -> 다음 상태는 증가하는 상태 (0, y)여야 하며 y < x
            for (int y = 0; y < x; y++) {
                transition[M + x][y] = 1;
            }
        }

        // 2. 행렬 거듭제곱을 이용해 (n - 1)번 전이 계산
        long[][] resultMatrix = matrixPower(transition, n - 1);

        // 3. 모든 가능한 시작/종료 경우의 수 합산
        long totalWays = 0;
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                totalWays = (totalWays + resultMatrix[i][j]) % MOD;
            }
        }

        return (int) totalWays;
    }

    private long[][] matrixPower(long[][] base, long exp) {
        int n = base.length;
        long[][] res = new long[n][n];
        for (int i = 0; i < n; i++) {
            res[i][i] = 1;
        }
        
        while (exp > 0) {
            if ((exp & 1) == 1) {
                res = multiply(res, base);
            }
            base = multiply(base, base);
            exp >>= 1;
        }
        return res;
    }

    private long[][] multiply(long[][] A, long[][] B) {
        int n = A.length;
        long[][] C = new long[n][n];
        for (int i = 0; i < n; i++) {
            for (int k = 0; k < n; k++) {
                if (A[i][k] == 0) continue;
                for (int j = 0; j < n; j++) {
                    C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
                }
            }
        }
        return C;
    }
}
