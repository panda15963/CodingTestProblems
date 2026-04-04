import java.util.*;

class Solution {

    private int n, m;
    private int[][] grid;
    private int[][][] visit;

    private int[] dx = { 1, 0, -1, 0 };
    private int[] dy = { 0, 1, 0, -1 };

    private int[][][] DIR = { { { 0, 1 }, { 2, 3 } }, { { 2, 1 }, { 3, 0 } } };
    private int[][] POS_DIR = { { 1, 1, 0, 0 }, { 0, 1, 1, 0 } };

    public int solution(int[][] grid) {
        this.n = grid.length;
        this.m = grid[0].length;
        this.grid = grid;
        this.visit = new int[n][m][2];

        int idx = 1;
        int answer = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                for (int k = 0; k < 2; k++) {
                    if (visit[i][j][k] != 0) continue;

                    answer = Math.max(answer, BFS(i, j, k, idx));
                    idx++;
                }
            }
        }
        return answer;
    }


    private int BFS(int x, int y, int pos, int idx) {
        int count = 1;

        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{x, y, pos});

        visit[x][y][pos] = idx;

        while (!queue.isEmpty()) {
            int[] poll = queue.poll();

            int currX = poll[0];
            int currY = poll[1];
            int[] dirs = DIR[grid[currX][currY] == 1 ? 0 : 1][poll[2]];

            for (int dir : dirs) {
                int nextX = currX + dx[dir];
                int nextY = currY + dy[dir];

                if (nextX < 0 || nextX >= n || nextY < 0 || nextY >= m) continue;

                int nextPos = POS_DIR[grid[nextX][nextY] == 1 ? 0 : 1][dir];
                if (
                    visit[nextX][nextY][nextPos] == idx ||
                    visit[nextX][nextY][(nextPos + 1) % 2] == idx
                ) continue;

                visit[nextX][nextY][nextPos] = idx;
                queue.add(new int[]{nextX, nextY, nextPos});
                count++;
            }
        }

        return count;
    }
}