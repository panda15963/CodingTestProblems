import java.util.*;

class Solution {
    static class State {
        long dist;
        int node;
        int remK;

        State(long dist, int node, int remK) {
            this.dist = dist;
            this.node = node;
            this.remK = remK;
        }
    }

    public int shortestPath(int n, int[][] edges, String labels, int k) {
        List<int[]>[] adj = new ArrayList[n];

        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int[] edge : edges) {
            adj[edge[0]].add(new int[]{edge[1], edge[2]});
        }

        long INF = Long.MAX_VALUE / 2;

        // dist[node][remK]
        long[][] dist = new long[n][k];

        for (int i = 0; i < n; i++) {
            Arrays.fill(dist[i], INF);
        }

        PriorityQueue<State> pq = new PriorityQueue<>(
            Comparator.comparingLong(a -> a.dist)
        );

        dist[0][k - 1] = 0;
        pq.offer(new State(0, 0, k - 1));

        while (!pq.isEmpty()) {
            State cur = pq.poll();

            long d = cur.dist;
            int u = cur.node;
            int remK = cur.remK;

            if (d != dist[u][remK]) {
                continue;
            }

            for (int[] edge : adj[u]) {
                int v = edge[0];
                int w = edge[1];

                int nextRemK;

                if (labels.charAt(u) == labels.charAt(v)) {
                    // 같은 라벨이면 남은 횟수 감소
                    if (remK == 0) {
                        continue;
                    }

                    nextRemK = remK - 1;
                } else {
                    // 라벨이 달라지면 횟수 초기화
                    nextRemK = k - 1;
                }

                long nextDist = d + w;

                if (nextDist < dist[v][nextRemK]) {
                    dist[v][nextRemK] = nextDist;

                    pq.offer(
                        new State(nextDist, v, nextRemK)
                    );
                }
            }
        }

        long answer = INF;

        for (int r = 0; r < k; r++) {
            answer = Math.min(answer, dist[n - 1][r]);
        }

        return answer == INF ? -1 : (int) answer;
    }
}