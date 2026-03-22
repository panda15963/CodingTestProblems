class Solution {
    public int solution(int[][] dots) {
        // 1번 경우
        if (isParallel(dots[0], dots[1], dots[2], dots[3])) return 1;

        // 2번 경우
        if (isParallel(dots[0], dots[2], dots[1], dots[3])) return 1;

        // 3번 경우
        if (isParallel(dots[0], dots[3], dots[1], dots[2])) return 1;

        return 0;
    }

    private boolean isParallel(int[] a, int[] b, int[] c, int[] d) {
        return (b[1] - a[1]) * (d[0] - c[0]) == (d[1] - c[1]) * (b[0] - a[0]);
    }
}