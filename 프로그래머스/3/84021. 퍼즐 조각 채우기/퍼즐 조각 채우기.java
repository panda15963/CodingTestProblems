import java.util.*;

class Solution {
    int n;
    boolean[][] visited;
    int[] dx = {1, -1, 0, 0};
    int[] dy = {0, 0, 1, -1};

    public int solution(int[][] game_board, int[][] table) {
        n = game_board.length;

        List<List<int[]>> blanks = getShapes(game_board, 0);
        List<List<int[]>> blocks = getShapes(table, 1);

        boolean[] used = new boolean[blocks.size()];
        int answer = 0;

        for (List<int[]> blank : blanks) {
            for (int i = 0; i < blocks.size(); i++) {
                if (used[i]) continue;

                List<int[]> block = blocks.get(i);

                for (int r = 0; r < 4; r++) {
                    if (equalsShape(blank, block)) {
                        answer += blank.size();
                        used[i] = true;
                        break;
                    }
                    block = rotate(block);
                }

                if (used[i]) break;
            }
        }

        return answer;
    }

    private List<List<int[]>> getShapes(int[][] board, int target) {
        visited = new boolean[n][n];
        List<List<int[]>> result = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (!visited[i][j] && board[i][j] == target) {
                    result.add(bfs(board, i, j, target));
                }
            }
        }

        return result;
    }

    private List<int[]> bfs(int[][] board, int x, int y, int target) {
        Queue<int[]> q = new LinkedList<>();
        List<int[]> cells = new ArrayList<>();

        q.offer(new int[]{x, y});
        visited[x][y] = true;
        cells.add(new int[]{x, y});

        while (!q.isEmpty()) {
            int[] cur = q.poll();

            for (int d = 0; d < 4; d++) {
                int nx = cur[0] + dx[d];
                int ny = cur[1] + dy[d];

                if (nx >= 0 && ny >= 0 && nx < n && ny < n &&
                        !visited[nx][ny] && board[nx][ny] == target) {
                    visited[nx][ny] = true;
                    q.offer(new int[]{nx, ny});
                    cells.add(new int[]{nx, ny});
                }
            }
        }

        return normalize(cells);
    }

    private List<int[]> normalize(List<int[]> shape) {
        int minX = Integer.MAX_VALUE;
        int minY = Integer.MAX_VALUE;

        for (int[] p : shape) {
            minX = Math.min(minX, p[0]);
            minY = Math.min(minY, p[1]);
        }

        List<int[]> result = new ArrayList<>();
        for (int[] p : shape) {
            result.add(new int[]{p[0] - minX, p[1] - minY});
        }

        result.sort((a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
        return result;
    }

    private List<int[]> rotate(List<int[]> shape) {
        List<int[]> rotated = new ArrayList<>();

        for (int[] p : shape) {
            rotated.add(new int[]{p[1], -p[0]});
        }

        return normalize(rotated);
    }

    private boolean equalsShape(List<int[]> a, List<int[]> b) {
        if (a.size() != b.size()) return false;

        for (int i = 0; i < a.size(); i++) {
            if (a.get(i)[0] != b.get(i)[0] ||
                a.get(i)[1] != b.get(i)[1]) return false;
        }
        return true;
    }
}