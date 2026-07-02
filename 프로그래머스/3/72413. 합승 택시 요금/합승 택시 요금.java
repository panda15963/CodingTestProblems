import java.util.Arrays;

class Solution {

    static final int INF = (int) 1e9;

    public int solution(int n, int s, int a, int b, int[][] fares) {

        int[][] dist = new int[n + 1][n + 1];

        // 거리 초기화
        for (int i = 1; i <= n; i++) {
            Arrays.fill(dist[i], INF);
            dist[i][i] = 0;
        }

        // 간선 정보 저장
        for (int[] fare : fares) {
            int from = fare[0];
            int to = fare[1];
            int cost = fare[2];

            dist[from][to] = cost;
            dist[to][from] = cost;
        }

        // 플로이드-워셜
        for (int k = 1; k <= n; k++) {
            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= n; j++) {

                    if (dist[i][k] == INF || dist[k][j] == INF) {
                        continue;
                    }

                    dist[i][j] = Math.min(
                        dist[i][j],
                        dist[i][k] + dist[k][j]
                    );
                }
            }
        }

        // 합승하지 않는 경우
        int noShare = dist[s][a] + dist[s][b];

        // 합승하는 경우
        int share = INF;

        for (int i = 1; i <= n; i++) {

            if (dist[s][i] == INF ||
                dist[i][a] == INF ||
                dist[i][b] == INF) {
                continue;
            }

            share = Math.min(
                share,
                dist[s][i] + dist[i][a] + dist[i][b]
            );
        }

        return Math.min(noShare, share);
    }
}