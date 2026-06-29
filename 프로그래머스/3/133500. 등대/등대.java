import java.util.*;

class Solution {
    List<List<Integer>> graph = new ArrayList<>();
    int answer = 0;

    public int solution(int n, int[][] lighthouse) {
        // 1. 그래프 초기화
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] l : lighthouse) {
            graph.get(l[0]).add(l[1]);
            graph.get(l[1]).add(l[0]);
        }

        // 2. DFS 탐색 (루트는 1로 지정)
        dfs(1, -1);

        return answer;
    }

    private int dfs(int current, int parent) {
        // 자식이 없는 리프 노드인 경우 -> 부모에게 불이 필요하다고 알림 (1 반환)
        if (graph.get(current).size() == 1 && graph.get(current).get(0) == parent) {
            return 1; 
        }

        int needLight = 0; // 자식 중 불을 켜야 하는 개수

        for (int child : graph.get(current)) {
            if (child != parent) {
                needLight += dfs(child, current); // 자식 노드의 반환값 합산
            }
        }

        // 1. 자식 노드 중 하나라도 불을 켜달라고 요청(1)한 경우 -> 현재 등대에 불을 켬
        if (needLight > 0) {
            answer++;
            return 0; // 현재 등대에 불을 켰으므로 부모에게 불이 필요 없다고 알림(0)
        }

        // 2. 자식 노드들이 모두 이미 불을 켰다고 알린 경우 -> 현재 등대는 불을 켤 필요 없음
        return 1;
    }
}