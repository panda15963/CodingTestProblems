import java.util.*;

class Solution {
    int[] dx = {-1, 1, 0, 0};
    int[] dy = {0, 0, -1, 1};

    public void solve(char[][] board) {
        int m = board.length;

        if (m == 0) {
            return;
        }

        int n = board[0].length;

        boolean[][] check = new boolean[m][n];

        // 테두리의 O부터 BFS
        for (int i = 0; i < m; i++) {
            dfs(board, check, i, 0, false);
            dfs(board, check, i, n - 1, false);
        }

        for (int j = 0; j < n; j++) {
            dfs(board, check, 0, j, false);
            dfs(board, check, m - 1, j, false);
        }

        // 방문하지 않은 O는 X로 변경
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(board, check, i, j, true);
            }
        }
    }

    private void dfs(
        char[][] board,
        boolean[][] check,
        int x,
        int y,
        boolean setToX
    ) {
        int m = board.length;
        int n = board[0].length;

        if (board[x][y] == 'X' || check[x][y]) {
            return;
        }

        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{x, y});
        check[x][y] = true;

        while (!queue.isEmpty()) {
            int[] current = queue.poll();

            int currentX = current[0];
            int currentY = current[1];

            if (setToX) {
                board[currentX][currentY] = 'X';
            }

            for (int i = 0; i < 4; i++) {
                int nx = currentX + dx[i];
                int ny = currentY + dy[i];

                if (nx < 0 || nx >= m || ny < 0 || ny >= n) {
                    continue;
                }

                if (check[nx][ny]) {
                    continue;
                }

                if (board[nx][ny] == 'X') {
                    continue;
                }

                check[nx][ny] = true;
                queue.offer(new int[]{nx, ny});
            }
        }
    }
}