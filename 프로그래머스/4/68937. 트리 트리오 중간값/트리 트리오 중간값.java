import java.util.*;

class Solution {

    static class State {
        int node;
        int len;

        State(int node, int len) {
            this.node = node;
            this.len = len;
        }
    }

    static ArrayList<Integer>[] graph;
    static int leaf;
    static int maxLen;
    static int cnt;

    static void func(int start, int n, boolean check) {
        boolean[] visit = new boolean[n + 1];
        Stack<State> stack = new Stack<>();

        stack.push(new State(start, 0));

        maxLen = 0;
        cnt = 0;

        while (!stack.isEmpty()) {
            State cur = stack.pop();

            if (visit[cur.node]) continue;
            visit[cur.node] = true;

            if (!check) {
                if (cur.len > maxLen) {
                    maxLen = cur.len;
                    leaf = cur.node;
                }
            } else {
                if (cur.len > maxLen) {
                    maxLen = cur.len;
                    leaf = cur.node;
                    cnt = 1;
                } else if (cur.len == maxLen) {
                    cnt++;
                }
            }

            for (int next : graph[cur.node]) {
                if (!visit[next]) {
                    stack.push(new State(next, cur.len + 1));
                }
            }
        }
    }

    public int solution(int n, int[][] edges) {

        graph = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] edge : edges) {
            graph[edge[0]].add(edge[1]);
            graph[edge[1]].add(edge[0]);
        }

        func(1, n, false);
        func(leaf, n, true);

        if (cnt >= 2) return maxLen;

        func(leaf, n, true);

        if (cnt >= 2) return maxLen;

        return maxLen - 1;
    }
}