import java.util.*;

class Solution {
    
    List<Integer>[] adj;
    
    Set<Integer> visited = new HashSet<>(); // 방문체크
    Map<Integer, List<Integer>> groupMap = new HashMap<>(); // groupNo -> nodes  

    public static final int FORWARD_TREE = 0; // 홀짝트리
    public static final int REVERSE_TREE = 1; // 역홀짝트리
    
    int yellow = 0;
    int red = 0;
    
    public int[] solution(int[] nodes, int[][] edges) {
        int[] answer = new int[2];
        int n = 1_000_000;
        
        adj = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new ArrayList<>();
        
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }
        
        for (int root : nodes) {
            yellow = 0; red = 0;
            searchGroup(root);
            
            // yello 1개 -> 모두 red로 만들 수 있음 -> 역홀짝
            if (yellow == 1) {
                answer[REVERSE_TREE]++;
            }
            
            // red 1개 -> 모두 yellow -> 홀짝
            if (red == 1) {
                answer[FORWARD_TREE]++;
            }
        }
        
        return answer;
    }
    // 해당 노드가 속한 그룹의 색깔을 카운트
    private void searchGroup(int now) {
        if (visited.contains(now)) {
            return;
        }
        visited.add(now);
        
        // 루트가 아닐때의 각 노드 색깔
        boolean isYellowWhenNotRoot = (now % 2 == (adj[now].size() - 1) % 2);
                
        if (isYellowWhenNotRoot) yellow++;
        else red++;
         
        for (int next : adj[now]) {
            searchGroup(next);    
        }
    } 
}