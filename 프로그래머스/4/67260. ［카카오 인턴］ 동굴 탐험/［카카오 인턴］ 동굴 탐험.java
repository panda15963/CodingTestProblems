import java.util.*;

class Solution {

    static int[] indegree;
    static ArrayList<Integer>[] adj;

    // 단방향 그래프 변환
    static void buildUnidirGraph(int n, int[][] path, int[][] order) {

        Queue<Integer> queue = new LinkedList<>();
        boolean[] check = new boolean[n];

        ArrayList<Integer>[] paths = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            paths[i] = new ArrayList<>();
        }

        for (int[] v : path) {
            paths[v[0]].add(v[1]);
            paths[v[1]].add(v[0]);
        }

        queue.offer(0);
        check[0] = true;

        while (!queue.isEmpty()) {
            int cur = queue.poll();

            for (int next : paths[cur]) {
                if (!check[next]) {
                    adj[cur].add(next);
                    indegree[next]++;
                    queue.offer(next);
                    check[next] = true;
                }
            }
        }

        for (int[] v : order) {
            adj[v[0]].add(v[1]);
            indegree[v[1]]++;
        }
    }

    // 위상정렬
    public boolean solution(int n, int[][] path, int[][] order) {

        indegree = new int[n];

        adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        buildUnidirGraph(n, path, order);

        Queue<Integer> queue = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        for (int i = 0; i < n; i++) {

            if (queue.isEmpty()) {
                return false;
            }

            int cur = queue.poll();

            for (int next : adj[cur]) {
                indegree[next]--;

                if (indegree[next] == 0) {
                    queue.offer(next);
                }
            }
        }

        return true;
    }
}