class Solution {
    public int[][] generateMatrix(int n) {
        int[][] answer = new int[n][n];
        int number = 0;

        int top = 0, bottom = n - 1;
        int left = 0, right = n - 1;

        while (top <= bottom && left <= right) {

            // 오른쪽으로 이동
            for (int col = left; col <= right; col++) {
                answer[top][col] = ++number;
            }
            top++;

            // 아래로 이동
            for (int row = top; row <= bottom; row++) {
                answer[row][right] = ++number;
            }
            right--;

            // 왼쪽으로 이동
            if (left <= right) {
                for (int col = right; col >= left; col--) {
                    answer[bottom][col] = ++number;
                }
                bottom--;
            }

            // 위로 이동
            if (top <= bottom) {
                for (int row = bottom; row >= top; row--) {
                    answer[row][left] = ++number;
                }
                left++;
            }
        }

        return answer;
    }
}