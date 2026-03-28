import java.util.*;

class Solution {
    int[] parent;

    public int solution(int n, int[][] costs) {
        parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        // 1. 비용 오름차순 정렬
        Arrays.sort(costs, (c1, c2) -> c1[2] - c2[2]);

        int answer = 0;
        int edges = 0;

        for (int[] edge : costs) {
            int a = edge[0];
            int b = edge[1];
            int cost = edge[2];

            if (find(a) != find(b)) {
                union(a, b);
                answer += cost;
                edges++;
                if (edges == n - 1) break;  // MST 완성
            }
        }

        return answer;
    }

    private int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    private void union(int x, int y) {
        int rx = find(x);
        int ry = find(y);
        if (rx != ry) {
            parent[rx] = ry;
        }
    }
}