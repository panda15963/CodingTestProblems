import java.util.*;

class Solution {
    private static final int[][] WEIGHTS = {
        {1, 7, 6, 7, 5, 4, 5, 3, 2, 3},
        {7, 1, 2, 4, 2, 3, 5, 4, 5, 6},
        {6, 2, 1, 2, 3, 2, 3, 5, 4, 5},
        {7, 4, 2, 1, 5, 3, 2, 6, 5, 4},
        {5, 2, 3, 5, 1, 2, 4, 2, 3, 5},
        {4, 3, 2, 3, 2, 1, 2, 3, 2, 3},
        {5, 5, 3, 2, 4, 2, 1, 5, 3, 2},
        {3, 4, 5, 6, 2, 3, 5, 1, 2, 4},
        {2, 5, 4, 5, 3, 2, 3, 2, 1, 2},
        {3, 6, 5, 4, 5, 3, 2, 4, 2, 1}
    };

    public int solution(String numbers) {
        int n = numbers.length();
        int INF = Integer.MAX_VALUE;

        int[][][] dp = new int[n + 1][10][10];

        // DP 배열 초기화
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < 10; j++) {
                Arrays.fill(dp[i][j], INF);
            }
        }

        // 초기 상태: 왼손 4, 오른손 6
        dp[0][4][6] = 0;

        for (int idx = 0; idx < n; idx++) {
            int num = numbers.charAt(idx) - '0';

            for (int left = 0; left < 10; left++) {
                for (int right = 0; right < 10; right++) {
                    if (left == right) continue;

                    int prev = dp[idx][left][right];
                    if (prev == INF) continue;

                    // 왼손 이동
                    dp[idx + 1][num][right] = Math.min(
                        dp[idx + 1][num][right],
                        prev + WEIGHTS[left][num]
                    );

                    // 오른손 이동
                    dp[idx + 1][left][num] = Math.min(
                        dp[idx + 1][left][num],
                        prev + WEIGHTS[right][num]
                    );
                }
            }
        }

        int answer = INF;

        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                answer = Math.min(answer, dp[n][i][j]);
            }
        }

        return answer;
    }
}