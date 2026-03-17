import java.util.*;

class Solution {
    public int largestSubmatrix(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;

        // 1. height 누적
        for (int i = 1; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    matrix[i][j] += matrix[i - 1][j];
                }
            }
        }

        int maxArea = 0;

        // 2. 정렬 + 3. 넓이 계산
        for (int i = 0; i < m; i++) {
            int[] row = matrix[i].clone(); // 원본 유지

            Arrays.sort(row); // 오름차순
            reverse(row);     // 내림차순

            for (int j = 0; j < n; j++) {
                int height = row[j];
                int width = j + 1;
                maxArea = Math.max(maxArea, height * width);
            }
        }

        return maxArea;
    }

    private void reverse(int[] arr) {
        int l = 0, r = arr.length - 1;
        while (l < r) {
            int temp = arr[l];
            arr[l] = arr[r];
            arr[r] = temp;
            l++;
            r--;
        }
    }
}