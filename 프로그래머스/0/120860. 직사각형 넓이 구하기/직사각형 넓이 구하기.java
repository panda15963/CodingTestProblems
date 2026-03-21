import java.util.Arrays;

class Solution {
    public int solution(int[][] dots) {
        int[] xs = {dots[0][0], dots[1][0], dots[2][0], dots[3][0]};
        int[] ys = {dots[0][1], dots[1][1], dots[2][1], dots[3][1]};

        Arrays.sort(xs);
        Arrays.sort(ys);

        int width = xs[3] - xs[0];
        int height = ys[3] - ys[0];

        return width * height;
    }
}