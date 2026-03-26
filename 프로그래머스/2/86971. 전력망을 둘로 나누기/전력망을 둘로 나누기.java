class Solution {
    public int solution(int n, int[][] wires) {
        int answer = n;

        for (int i = 0; i < wires.length; i++) {
            boolean[] visited = new boolean[n + 1];

            int count = dfs(wires, visited, wires[i][0], i);

            int diff = Math.abs(count - (n - count));
            answer = Math.min(answer, diff);
        }

        return answer;
    }

    private int dfs(int[][] wires, boolean[] visited, int node, int skipIndex) {
        visited[node] = true;
        int count = 1;

        for (int i = 0; i < wires.length; i++) {
            if (i == skipIndex) continue;

            int a = wires[i][0];
            int b = wires[i][1];

            if (a == node && !visited[b]) {
                count += dfs(wires, visited, b, skipIndex);
            } else if (b == node && !visited[a]) {
                count += dfs(wires, visited, a, skipIndex);
            }
        }

        return count;
    }
}