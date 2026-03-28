class Solution {
    public int solution(String[] arr) {
        int n = (arr.length + 1) / 2;

        int[][] dpMax = new int[n][n];
        int[][] dpMin = new int[n][n];

        // 초기값
        for (int i = 0; i < n; i++) {
            dpMax[i][i] = dpMin[i][i] = Integer.parseInt(arr[i * 2]);
        }

        // 구간 길이
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;

                dpMax[i][j] = Integer.MIN_VALUE;
                dpMin[i][j] = Integer.MAX_VALUE;

                for (int k = i; k < j; k++) {
                    String op = arr[k * 2 + 1];

                    if (op.equals("+")) {
                        dpMax[i][j] = Math.max(dpMax[i][j],
                                dpMax[i][k] + dpMax[k + 1][j]);

                        dpMin[i][j] = Math.min(dpMin[i][j],
                                dpMin[i][k] + dpMin[k + 1][j]);
                    } else {
                        dpMax[i][j] = Math.max(dpMax[i][j],
                                dpMax[i][k] - dpMin[k + 1][j]);

                        dpMin[i][j] = Math.min(dpMin[i][j],
                                dpMin[i][k] - dpMax[k + 1][j]);
                    }
                }
            }
        }

        return dpMax[0][n - 1];
    }
}