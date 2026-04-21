import java.util.*;

class Solution {
    public int solution(int[][] land) {
        int n = land.length;
        int m = land[0].length;
        int[] colOil = new int[m];
        boolean[][] visited = new boolean[n][m];
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (land[i][j] == 1 && !visited[i][j]) {
                    // BFS로 덩어리 탐색
                    Queue<int[]> q = new LinkedList<>();
                    q.offer(new int[]{i, j});
                    visited[i][j] = true;
                    int size = 0;
                    int minC = j, maxC = j;

                    while (!q.isEmpty()) {
                        int[] cur = q.poll();
                        size++;
                        minC = Math.min(minC, cur[1]);
                        maxC = Math.max(maxC, cur[1]);

                        for (int k = 0; k < 4; k++) {
                            int nr = cur[0] + dr[k];
                            int nc = cur[1] + dc[k];
                            if (nr >= 0 && nr < n && nc >= 0 && nc < m && land[nr][nc] == 1 && !visited[nr][nc]) {
                                visited[nr][nc] = true;
                                q.offer(new int[]{nr, nc});
                            }
                        }
                    }
                    // 해당 덩어리가 포함하는 모든 열에 크기 더하기
                    for (int c = minC; c <= maxC; c++) {
                        colOil[c] += size;
                    }
                }
            }
        }

        int maxOil = 0;
        for (int oil : colOil) {
            maxOil = Math.max(maxOil, oil);
        }
        return maxOil;
    }
}
