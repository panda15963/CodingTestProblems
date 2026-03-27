class Solution {
    public boolean areSimilar(int[][] mat, int k) {
        int m = mat.length;
        int n = mat[0].length;

        int shift = k % n; // 유효한 이동 거리

        if (shift == 0) {
            return true;
        }

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {

                if (r % 2 == 0) {
                    // 짝수 행: 왼쪽으로 shift
                    int nc = (c + shift) % n;
                    if (mat[r][c] != mat[r][nc]) {
                        return false;
                    }
                } else {
                    // 홀수 행: 오른쪽으로 shift
                    int nc = (c - shift + n) % n;
                    if (mat[r][c] != mat[r][nc]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}