class Solution {
    public int uniquePaths(int m, int n) {
        int[][] acc = new int[m][n];

        for (int i = 0; i < m; i++) {//각 첫번째 행 1 초기화
            acc[i][0] = 1;
        }

        for (int i = 0; i < n; i++) {//각 첫번째 열 1 초기화
            acc[0][i] = 1;
        }

        for (int c = 1; c < n; c++) {
            for (int r = 1; r < m; r++) {
                acc[r][c] = acc[r - 1][c] + acc[r][c - 1];//현 위치 누적값 = 이전 행 누적값 + 이전 열 누적값
            }
        }

        return acc[m - 1][n - 1];
    }
}