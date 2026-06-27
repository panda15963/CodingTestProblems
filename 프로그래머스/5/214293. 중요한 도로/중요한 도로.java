import java.util.*;

class Solution {
    static final long INF = Long.MAX_VALUE / 3;
    static final long MOD1 = 1_000_000_007;
    static final long MOD2 = 1_000_000_009;

    static class Edge {
        int id, to;
        long weight, length;

        public Edge(int id, int to, long weight, long length) {
            this.id = id;
            this.to = to;
            this.weight = weight;
            this.length = length;
        }
    }

    static class Node implements Comparable<Node> {
        int vertex;
        long dist;

        public Node(int vertex, long dist) {
            this.vertex = vertex;
            this.dist = dist;
        }

        @Override
        public int compareTo(Node o) {
            return Long.compare(this.dist, o.dist);
        }
    }

    public int[] solution(int n, int[][] roads) {
        // 1. 양방향 인접 리스트 생성
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int i = 0; i < roads.length; i++) {
            int u = roads[i][0];
            int v = roads[i][1];
            long length = roads[i][2];
            long traffic = roads[i][3];
            long cost = length + traffic;
            int id = i + 1;

            graph.get(u).add(new Edge(id, v, cost, length));
            graph.get(v).add(new Edge(id, u, cost, length));
        }

        // 2. 1번 정점과 N번 정점에서 각각 다익스트라 수행
        long[] dist1 = dijkstra(1, n, graph);
        long[] distN = dijkstra(n, n, graph);

        long shortestPath = dist1[n];
        if (shortestPath >= INF) {
            return new int[]{-1};
        }

        // 3. 최단 경로 상에 노드가 포함되는지 확인
        boolean[] onPath = new boolean[n + 1];
        for (int i = 1; i <= n; i++) {
            if (dist1[i] + distN[i] == shortestPath) {
                onPath[i] = true;
            }
        }

        // 4. 최단 경로 DAG의 진입 차수(inDegree) 계산 및 위상 정렬
        int[] inDegree = new int[n + 1];
        for (int u = 1; u <= n; u++) {
            if (!onPath[u]) continue;
            for (Edge edge : graph.get(u)) {
                int v = edge.to;
                if (onPath[v] && dist1[u] + edge.weight + distN[v] == shortestPath) {
                    inDegree[v]++;
                }
            }
        }

        Queue<Integer> queue = new LinkedList<>();
        queue.add(1);
        List<Integer> topoOrder = new ArrayList<>();

        while (!queue.isEmpty()) {
            int u = queue.poll();
            topoOrder.add(u);
            for (Edge edge : graph.get(u)) {
                int v = edge.to;
                if (onPath[v] && dist1[u] + edge.weight + distN[v] == shortestPath) {
                    inDegree[v]--;
                    if (inDegree[v] == 0) {
                        queue.add(v);
                    }
                }
            }
        }

        // 5. 정방향 최단 경로 가짓수 계산 (Double Modulo)
        long[] paths1_m1 = new long[n + 1];
        long[] paths1_m2 = new long[n + 1];
        paths1_m1[1] = 1;
        paths1_m2[1] = 1;

        for (int u : topoOrder) {
            for (Edge edge : graph.get(u)) {
                int v = edge.to;
                if (onPath[v] && dist1[u] + edge.weight + distN[v] == shortestPath) {
                    paths1_m1[v] = (paths1_m1[v] + paths1_m1[u]) % MOD1;
                    paths1_m2[v] = (paths1_m2[v] + paths1_m2[u]) % MOD2;
                }
            }
        }

        // 6. 역방향 최단 경로 가짓수 계산 (Double Modulo)
        long[] pathsN_m1 = new long[n + 1];
        long[] pathsN_m2 = new long[n + 1];
        pathsN_m1[n] = 1;
        pathsN_m2[n] = 1;

        for (int i = topoOrder.size() - 1; i >= 0; i--) {
            int u = topoOrder.get(i);
            for (Edge edge : graph.get(u)) {
                int v = edge.to;
                if (onPath[v] && dist1[u] + edge.weight + distN[v] == shortestPath) {
                    pathsN_m1[u] = (pathsN_m1[u] + pathsN_m1[v]) % MOD1;
                    pathsN_m2[u] = (pathsN_m2[u] + pathsN_m2[v]) % MOD2;
                }
            }
        }

        // 7. 중요 도로 핵심 판별
        Set<Integer> importantRoads = new TreeSet<>();
        long totalPaths1 = paths1_m1[n];
        long totalPaths2 = paths1_m2[n];

        for (int i = 0; i < roads.length; i++) {
            int u = roads[i][0];
            int v = roads[i][1];
            long length = roads[i][2];
            long traffic = roads[i][3];
            long cost = length + traffic;
            int id = i + 1;

            // 조건 A: 교통량 감소 시 전체 최단 경로가 단축되는 경우
            if (dist1[u] + length + distN[v] < shortestPath || dist1[v] + length + distN[u] < shortestPath) {
                importantRoads.add(id);
                continue;
            }

            // 조건 B: 교통량 증가 시 우회로가 없어 최단 경로가 무조건 늘어나는 경우 (Bridge 판별)
            if (onPath[u] && onPath[v]) {
                // u -> v 방향 검증
                if (dist1[u] + cost + distN[v] == shortestPath) {
                    long p1 = (paths1_m1[u] * pathsN_m1[v]) % MOD1;
                    long p2 = (paths1_m2[u] * pathsN_m2[v]) % MOD2;
                    if (p1 == totalPaths1 && p2 == totalPaths2) {
                        importantRoads.add(id);
                    }
                }
                // v -> u 방향 검증
                if (dist1[v] + cost + distN[u] == shortestPath) {
                    long p1 = (paths1_m1[v] * pathsN_m1[u]) % MOD1;
                    long p2 = (paths1_m2[v] * pathsN_m2[u]) % MOD2;
                    if (p1 == totalPaths1 && p2 == totalPaths2) {
                        importantRoads.add(id);
                    }
                }
            }
        }

        // 8. 조건 충족 도로가 없을 때 처리
        if (importantRoads.isEmpty()) {
            return new int[]{-1};
        }

        int[] answer = new int[importantRoads.size()];
        int idx = 0;
        for (int id : importantRoads) {
            answer[idx++] = id;
        }

        return answer;
    }

    private long[] dijkstra(int start, int n, List<List<Edge>> graph) {
        long[] dist = new long[n + 1];
        Arrays.fill(dist, INF);
        dist[start] = 0;

        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(start, 0));

        while (!pq.isEmpty()) {
            Node curr = pq.poll();
            if (curr.dist > dist[curr.vertex]) continue;

            for (Edge edge : graph.get(curr.vertex)) {
                if (dist[edge.to] > dist[curr.vertex] + edge.weight) {
                    dist[edge.to] = dist[curr.vertex] + edge.weight;
                    pq.add(new Node(edge.to, dist[edge.to]));
                }
            }
        }
        return dist;
    }
}
