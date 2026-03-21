public class Solution {
    public int[][] reverseSubmatrix(int[][] grid, int x, int y, int k) {
        int top = x;
        int bottom = x + k - 1;

        while (top < bottom) {
            for (int c = 0; c < k; c++) {
                int temp = grid[top][y + c];
                grid[top][y + c] = grid[bottom][y + c];
                grid[bottom][y + c] = temp;
            }
            top++;
            bottom--;
        }

        return grid;
    }
}