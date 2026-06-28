import java.util.Arrays;

class Solution {
    public int solution(int x, int y, int n) {
        // dp[i]는 i를 만드는 최소 연산 횟수, 초기값은 -1(도달 불가)
        int[] dp = new int[y + 1];
        Arrays.fill(dp, -1);
        dp[x] = 0; // x에서 시작

        for (int i = x; i <= y; i++) {
            // 도달할 수 없는 숫자는 건너뜀
            if (dp[i] == -1) {
                continue;
            }

            // 1. n 더하기
            if (i + n <= y) {
                if (dp[i + n] == -1) {
                    dp[i + n] = dp[i] + 1;
                } else {
                    dp[i + n] = Math.min(dp[i + n], dp[i] + 1);
                }
            }

            // 2. 2 곱하기
            if (i * 2 <= y) {
                if (dp[i * 2] == -1) {
                    dp[i * 2] = dp[i] + 1;
                } else {
                    dp[i * 2] = Math.min(dp[i * 2], dp[i] + 1);
                }
            }

            // 3. 3 곱하기
            if (i * 3 <= y) {
                if (dp[i * 3] == -1) {
                    dp[i * 3] = dp[i] + 1;
                } else {
                    dp[i * 3] = Math.min(dp[i * 3], dp[i] + 1);
                }
            }
        }

        return dp[y];
    }
}