class Solution {
    static int[] dx = {1, 0, 0, -1}; // d, l, r, u
    static int[] dy = {0, -1, 1, 0};
    static char[] dir = {'d', 'l', 'r', 'u'};
    static String answer = null;

    public String solution(int n, int m, int x, int y, int r, int c, int k) {
        int dist = Math.abs(x - r) + Math.abs(y - c);
        // 맨해튼 거리가 k보다 크거나, k-dist가 짝수가 아니면 탈출 불가
        if (dist > k || (k - dist) % 2 != 0) return "impossible";
        
        dfs(n, m, x, y, r, c, k, new StringBuilder());
        
        return answer == null ? "impossible" : answer;
    }

    void dfs(int n, int m, int x, int y, int r, int c, int k, StringBuilder path) {
        if (answer != null) return; // 이미 답을 찾은 경우
        if (path.length() == k) {
            if (x == r && y == c) answer = path.toString();
            return;
        }

        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            
            // 범위 체크 및 가지치기
            if (nx > 0 && nx <= n && ny > 0 && ny <= m) {
                int nextDist = Math.abs(nx - r) + Math.abs(ny - c);
                if (nextDist + path.length() + 1 <= k) {
                    path.append(dir[i]);
                    dfs(n, m, nx, ny, r, c, k, path);
                    path.deleteCharAt(path.length() - 1);
                }
            }
        }
    }
}
