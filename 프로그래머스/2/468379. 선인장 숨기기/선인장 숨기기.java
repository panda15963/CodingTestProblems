import java.util.*;

class Solution {

    public int[] solution(int m, int n, int h, int w, int[][] drops) {

        // 각 칸에 비가 떨어지는 시간
        int[][] time = new int[m][n];

        for (int i = 0; i < m; i++) {
            Arrays.fill(time[i], Integer.MAX_VALUE);
        }

        // drop 순서 기록
        for (int i = 0; i < drops.length; i++) {
            int r = drops[i][0];
            int c = drops[i][1];
            time[r][c] = i + 1;
        }

        // 가로 sliding window 최소값
        int[][] rowMin = new int[m][n - w + 1];

        for (int i = 0; i < m; i++) {

            Deque<Integer> dq = new ArrayDeque<>();

            for (int j = 0; j < n; j++) {

                while (!dq.isEmpty() && time[i][dq.peekLast()] >= time[i][j]) {
                    dq.pollLast();
                }

                dq.addLast(j);

                if (dq.peekFirst() <= j - w) {
                    dq.pollFirst();
                }

                if (j >= w - 1) {
                    rowMin[i][j - w + 1] = time[i][dq.peekFirst()];
                }
            }
        }

        int bestTime = -1;
        int bestX = 0;
        int bestY = 0;

        // 세로 sliding window
        for (int j = 0; j < n - w + 1; j++) {

            Deque<Integer> dq = new ArrayDeque<>();

            for (int i = 0; i < m; i++) {

                while (!dq.isEmpty() && rowMin[dq.peekLast()][j] >= rowMin[i][j]) {
                    dq.pollLast();
                }

                dq.addLast(i);

                if (dq.peekFirst() <= i - h) {
                    dq.pollFirst();
                }

                if (i >= h - 1) {

                    int t = rowMin[dq.peekFirst()][j];

                    int startX = i - h + 1;
                    int startY = j;

                    if (t > bestTime ||
   (t == bestTime && (startX < bestX ||
   (startX == bestX && startY < bestY)))) {

    bestTime = t;
    bestX = startX;
    bestY = startY;
}
                }
            }
        }

        return new int[]{bestX, bestY};
    }
}
