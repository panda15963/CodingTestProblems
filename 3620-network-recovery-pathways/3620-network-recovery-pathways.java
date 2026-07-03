import java.util.*;

public class Solution {
    
    // 간선 정보를 담는 클래스
    static class Edge {
        int to;
        long cost; // 문제에서 k가 long이므로 비용 합산 시 오버플로우를 막기 위해 long 처리
        
        Edge(int to, long cost) {
            this.to = to;
            this.cost = cost;
        }
    }

    public int findMaxPathScore(int[][] edges, boolean[] online, long k) {
        int n = online.length;
        
        // 1. 인접 리스트 그래프 생성
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        
        int maxCost = 0;
        for (int[] edge : edges) {
            int from = edge[0];
            int to = edge[1];
            long cost = edge[2]; // 정확한 인덱스 파싱 (0: 출발, 1: 도착, 2: 비용)
            
            // 만약 출발 노드나 도착 노드가 오프라인이면 애초에 그래프에 추가하지 않음
            if (!online[from] || !online[to]) {
                continue;
            }
            
            graph.get(from).add(new Edge(to, cost));
            maxCost = Math.max(maxCost, (int) cost);
        }

        // 2. 이진 탐색 (최소 비용의 최댓값 찾기)
        int low = 0;
        int high = maxCost;
        int answer = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // mid 비용 이상의 간선만 사용해서 n-1까지 총 비용 k 이하로 갈 수 있는가?
            if (canReach(mid, n, graph, k)) {
                answer = mid; // 가능하다면 정답 후보로 저장하고 더 큰 비용 기준 탐색
                low = mid + 1;
            } else {
                high = mid - 1; // 불가능하다면 기준 완화 (더 작은 비용 탐색)
            }
        }

        return answer;
    }

    // 다익스트라(Dijkstra)를 활용한 경로 유효성 검사 함수
    private boolean canReach(int minBound, int n, List<List<Edge>> graph, long k) {
        long[] minCost = new long[n];
        Arrays.fill(minCost, Long.MAX_VALUE);
        minCost[0] = 0;

        // {현재 노드, 누적 비용} -> 비용이 낮은 순으로 정렬
        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[1], b[1]));
        pq.offer(new long[]{0, 0});

        while (!pq.isEmpty()) {
            long[] curr = pq.poll();
            int u = (int) curr[0];
            long costSoFar = curr[1];

            if (costSoFar > minCost[u]) {
                continue;
            }

            if (u == n - 1) {
                return costSoFar <= k;
            }

            for (Edge edge : graph.get(u)) {
                // 제약 조건: 간선의 비용이 이진 탐색 기준(minBound)보다 작으면 패스
                if (edge.cost < minBound) {
                    continue;
                }

                long nextCost = costSoFar + edge.cost;

                // 총비용이 k를 넘어가면 탐색 중단 (가지치기)
                if (nextCost > k) {
                    continue;
                }

                if (nextCost < minCost[edge.to]) {
                    minCost[edge.to] = nextCost;
                    pq.offer(new long[]{edge.to, nextCost});
                }
            }
        }

        return minCost[n - 1] <= k;
    }
}
