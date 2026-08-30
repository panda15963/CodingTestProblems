import java.util.*;

class Solution {
    private List<Integer> ans;
    private Map<Integer, Set<Integer>> graph;
    private int[] visit;

    public int[] findOrder(int numCourses, int[][] prerequisites) {
        ans = new ArrayList<>();
        graph = new HashMap<>();

        // 그래프 생성
        for (int[] prerequisite : prerequisites) {
            int course = prerequisite[0];
            int required = prerequisite[1];

            graph.computeIfAbsent(course, k -> new HashSet<>())
                 .add(required);
        }

        // 0: 방문하지 않음
        // -1: 현재 DFS 경로에서 방문 중
        // 1: 방문 완료
        visit = new int[numCourses];

        for (int i = 0; i < numCourses; i++) {
            if (!dfs(i)) {
                return new int[0];
            }
        }

        // List<Integer> -> int[]
        int[] result = new int[ans.size()];

        for (int i = 0; i < ans.size(); i++) {
            result[i] = ans.get(i);
        }

        return result;
    }

    private boolean dfs(int i) {
        // 현재 DFS 경로에서 다시 방문
        // -> 사이클 발견
        if (visit[i] == -1) {
            return false;
        }

        // 이미 방문 완료
        if (visit[i] == 1) {
            return true;
        }

        // 방문 중으로 표시
        visit[i] = -1;

        // 선수 과목 탐색
        for (int prerequisite : graph.getOrDefault(i, Collections.emptySet())) {
            if (!dfs(prerequisite)) {
                return false;
            }
        }

        // 탐색 완료
        visit[i] = 1;

        // 선수 과목을 먼저 추가하고 현재 과목을 추가
        ans.add(i);

        return true;
    }
}