import java.util.Arrays;

class Solution {
    public int findMinArrowShots(int[][] points) {
        Arrays.sort(points, (a, b) -> Integer.compare(a[0], b[0]));

        int cnt = 0;
        long minRight = -(1L << 32);

        for (int[] point : points) {
            int left = point[0];
            int right = point[1];

            if (left > minRight) {
                cnt++;
                minRight = right;
            } else {
                minRight = Math.min(minRight, right);
            }
        }

        return cnt;
    }
}