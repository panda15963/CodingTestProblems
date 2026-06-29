import java.util.*;

class Solution {
    public int[] solution(int n, int[][] roads, int[] sources, int destination) {
        // 1. 그래프 생성
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] road : roads) {
            graph.get(road[0]).add(road[1]);
            graph.get(road[1]).add(road[0]);
        }

        // 2. 목적지로부터 모든 지점까지의 최단 거리 배열 초기화
        int[] dist = new int[n + 1];
        Arrays.fill(dist, -1);

        // 3. 목적지 기준 BFS 탐색
        Queue<Integer> q = new LinkedList<>();
        q.add(destination);
        dist[destination] = 0;

        while (!q.isEmpty()) {
            int current = q.poll();

            for (int next : graph.get(current)) {
                // 아직 방문하지 않은 지역인 경우
                if (dist[next] == -1) {
                    dist[next] = dist[current] + 1;
                    q.add(next);
                }
            }
        }

        // 4. sources 각 대원들의 최단 복귀 시간 결과 배열 생성
        int[] answer = new int[sources.length];
        for (int i = 0; i < sources.length; i++) {
            answer[i] = dist[sources[i]];
        }

        return answer;
    }
}