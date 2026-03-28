import java.util.*;

class Solution {
    boolean[] visited;
    List<String> answer;

    public String[] solution(String[][] tickets) {
        visited = new boolean[tickets.length];

        // 사전순 정렬
        Arrays.sort(tickets, (a, b) -> {
            if (a[0].equals(b[0])) return a[1].compareTo(b[1]);
            return a[0].compareTo(b[0]);
        });

        List<String> path = new ArrayList<>();
        path.add("ICN");

        dfs("ICN", tickets, path);

        return answer.toArray(new String[0]);
    }

    private boolean dfs(String cur, String[][] tickets, List<String> path) {
        if (path.size() == tickets.length + 1) {
            answer = new ArrayList<>(path);
            return true;
        }

        for (int i = 0; i < tickets.length; i++) {
            if (!visited[i] && tickets[i][0].equals(cur)) {
                visited[i] = true;
                path.add(tickets[i][1]);

                if (dfs(tickets[i][1], tickets, path)) return true;

                // 백트래킹
                visited[i] = false;
                path.remove(path.size() - 1);
            }
        }

        return false;
    }
}