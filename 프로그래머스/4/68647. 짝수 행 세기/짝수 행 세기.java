class Solution {

    static final int MODULER = 10000019;

    static void calculateCombination(long[][] nCr, int row) {
        nCr[0][0] = 1;

        for (int i = 1; i <= row; i++) {
            for (int j = 0; j <= row; j++) {
                if (j == 0) {
                    nCr[i][j] = 1;
                } else if (i == j) {
                    nCr[i][j] = 1;
                } else {
                    nCr[i][j] = nCr[i - 1][j - 1] + nCr[i - 1][j];
                }

                nCr[i][j] %= MODULER;
            }
        }
    }

    static void calculateOneCnt(int[] oneCnt, int[][] map) {
        for (int i = 0; i < map.length; i++) {
            for (int j = 0; j < map[0].length; j++) {
                oneCnt[j] += map[i][j];
            }
        }
    }

    public int solution(int[][] a) {

        int row = a.length;
        int col = a[0].length;

        long[][] nCr = new long[row + 1][row + 1];
        calculateCombination(nCr, row);

        int[] arrOneCnt = new int[col + 1];
        calculateOneCnt(arrOneCnt, a);

        long[][] dp = new long[col + 2][row + 1];

        dp[1][row - arrOneCnt[0]] = nCr[row][row - arrOneCnt[0]];

        for (int column = 1; column < col; column++) {

            int oneCnt = arrOneCnt[column];

            for (int evenNum = 0; evenNum <= row; evenNum++) {

                if (dp[column][evenNum] == 0) continue;

                for (int k = 0; k <= oneCnt; k++) {

                    if (evenNum < k) continue;

                    int beEvenRow = evenNum + oneCnt - (2 * k);

                    if (beEvenRow > row) continue;

                    long result =
                            (nCr[evenNum][k] *
                             nCr[row - evenNum][oneCnt - k]) % MODULER;

                    dp[column + 1][beEvenRow] +=
                            dp[column][evenNum] * result;

                    dp[column + 1][beEvenRow] %= MODULER;
                }
            }
        }

        return (int) dp[col][row];
    }
}