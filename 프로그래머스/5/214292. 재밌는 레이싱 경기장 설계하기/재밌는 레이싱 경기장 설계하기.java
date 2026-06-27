import java.util.Arrays;

class Solution {
    public int solution(int[] heights) {
        Arrays.sort(heights);
        int n = heights.length;

        int[] minusV = new int[n / 2 + 1];
        int idx = 0;

        if (n % 2 == 1) { // 홀수
            for (int i = 0; i < n / 2; i++) {
                minusV[idx++] = heights[i + n / 2] - heights[i];
            }
            minusV[idx++] = heights[n - 1] - heights[n / 2];

            Arrays.sort(minusV, 0, idx);
            return minusV[1];
        } else { // 짝수
            for (int i = 0; i < n / 2; i++) {
                minusV[idx++] = heights[i + n / 2] - heights[i];
            }

            Arrays.sort(minusV, 0, idx);
            return minusV[0];
        }
    }
}