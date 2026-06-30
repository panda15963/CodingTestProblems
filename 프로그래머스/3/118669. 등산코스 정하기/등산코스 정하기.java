import java.util.*;

class Solution {
    public int[] solution(int n, int[][] paths, int[] gates, int[] summits) {
        // 1. 그래프 초기화
        List<Node>[] graph = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) graph[i] = new ArrayList<>();

        for (int[] path : paths) {
            int u = path[0], v = path[1], w = path[2];
            graph[u].add(new Node(v, w));
            graph[v].add(new Node(u, w));
        }

        // 2. 산봉우리 확인용 Set
        Set<Integer> summitSet = new HashSet<>();
        for (int summit : summits) summitSet.add(summit);

        // 3. 다익스트라 배열 초기화
        int[] intensity = new int[n + 1];
        Arrays.fill(intensity, Integer.MAX_VALUE);

        PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.weight, b.weight));

        // 4. 모든 출입구를 큐에 삽입
        for (int gate : gates) {
            pq.offer(new Node(gate, 0));
            intensity[gate] = 0;
        }

        // 5. 다익스트라 실행
        while (!pq.isEmpty()) {
            Node current = pq.poll();

            // 현재 intensity가 이미 기록된 값보다 크면 탐색 필요 X
            if (current.weight > intensity[current.vertex]) continue;

            // 산봉우리에 도달했거나 출입구인 경우 더 이상 이동 X
            if (summitSet.contains(current.vertex)) continue;

            for (Node neighbor : graph[current.vertex]) {
                int newIntensity = Math.max(current.weight, neighbor.weight);

                // 더 작은 intensity를 발견하면 갱신하고 큐에 추가
                if (newIntensity < intensity[neighbor.vertex]) {
                    intensity[neighbor.vertex] = newIntensity;
                    pq.offer(new Node(neighbor.vertex, newIntensity));
                }
            }
        }

        // 6. 결과 정렬 (산봉우리 번호 오름차순, intensity 오름차순)
        Arrays.sort(summits);
        int minSummite = -1;
        int minIntensity = Integer.MAX_VALUE;

        for (int summit : summits) {
            if (intensity[summit] < minIntensity) {
                minIntensity = intensity[summit];
                minSummite = summit;
            }
        }

        return new int[]{minSummite, minIntensity};
    }

    class Node {
        int vertex, weight;

        public Node(int vertex, int weight) {
            this.vertex = vertex;
            this.weight = weight;
        }
    }
}