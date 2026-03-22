class Solution {
    public boolean findRotation(int[][] mat, int[][] target) {
        for (int i = 0; i < 4; i++) {
            if (isEqual(mat, target)) return true;
            mat = rotate(mat);
        }
        return false;
    }

    private boolean isEqual(int[][] a, int[][] b) {
        int n = a.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (a[i][j] != b[i][j]) return false;
            }
        }
        return true;
    }

    private int[][] rotate(int[][] mat) {
        int n = mat.length;
        int[][] newMat = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                newMat[j][n - i - 1] = mat[i][j];
            }
        }
        return newMat;
    }
}