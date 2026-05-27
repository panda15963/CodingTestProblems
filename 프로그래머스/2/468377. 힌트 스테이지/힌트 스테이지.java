import java.util.*;

class Solution {
    public int solution(int[][] cost, int[][] hint) {
        int answer = Integer.MAX_VALUE;

        int n = cost.length;
        int[] hints;

        for (int i = 0; i < (1 << (n - 1)); i++) {
            hints = new int[n];
            int cur = 0;

            for (int j = 0; j < n; j++) {
                if (hints[j] >= n) {
                    cur += cost[j][n - 1];
                } else {
                    cur += cost[j][hints[j]];
                }

                if ((i & (1 << j)) != 0) {
                    cur += hint[j][0];

                    for (int k = 1; k < hint[j].length; k++) {
                        hints[hint[j][k] - 1]++;
                    }
                }
            }

            answer = Math.min(answer, cur);
        }

        return answer;
    }
}