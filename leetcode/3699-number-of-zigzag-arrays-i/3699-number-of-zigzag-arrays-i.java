class Solution {
    public int zigZagArrays(int n, int l, int r) {
        int m = r - l;
        int MOD = 1_000_000_007;

        // n이 1인 경우 범위 내 모든 숫자가 각각 하나의 유효한 지그재그 배열입니다.
        if (n == 1) {
            return m + 1;
        }

        // up[i]: 현재 숫자가 i이고, 다음 숫자는 i보다 커야 하는(증가할) 경우의 수
        // down[i]: 현재 숫자가 i이고, 다음 숫자는 i보다 작아야 하는(감소할) 경우의 수
        // 0부터 m까지 총 m + 1개의 숫자가 존재합니다.
        long[] up = new long[m + 1];
        long[] down = new long[m + 1];

        // 길이 2인 지그재그 배열 초기화
        // up[i]: 나보다 큰 숫자의 개수 (m - i)
        // down[i]: 나보다 작은 숫자의 개수 (i)
        for (int i = 0; i <= m; i++) {
            up[i] = m - i;
            down[i] = i;
        }

        // 길이 3부터 n까지 DP 진행
        for (int len = 3; len <= n; len++) {
            long[] nextUp = new long[m + 1];
            long[] nextDown = new long[m + 1];

            // 1. nextUp[i] 계산을 위한 Prefix Sum (down 배열의 누적합 활용)
            // nextUp[i] = 현재 i보다 큰 j들에 대한 down[j]의 총합
            long currentDownSum = 0;
            for (int i = m; i >= 0; i--) {
                nextUp[i] = currentDownSum;
                currentDownSum = (currentDownSum + down[i]) % MOD;
            }

            // 2. nextDown[i] 계산을 위한 Prefix Sum (up 배열의 누적합 활용)
            // nextDown[i] = 현재 i보다 작은 j들에 대한 up[j]의 총합
            long currentUpSum = 0;
            for (int i = 0; i <= m; i++) {
                nextDown[i] = currentUpSum;
                currentUpSum = (currentUpSum + up[i]) % MOD;
            }

            up = nextUp;
            down = nextDown;
        }

        // 마지막 상태의 모든 경우의 수를 더해줍니다.
        long totalCount = 0;
        for (int i = 0; i <= m; i++) {
            totalCount = (totalCount + up[i] + down[i]) % MOD;
        }

        return (int) totalCount;
    }
}
