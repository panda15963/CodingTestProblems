import java.util.*;
class Solution {
    class Pipe{
        int to, type;
        Pipe(int to, int type){
            this.to = to;
            this.type = type;
        }
    }
    List<List<Pipe>> tree = new ArrayList<>();
    int answer = 0, n, k, infection;
    int[] orders;
    public int solution(int n, int infection, int[][] edges, int k) {
        this.n = n; this.k = k; this.infection = infection;
        orders = new int[k];
        for(int i = 0; i<=n; i++){
            tree.add(new ArrayList<>());
        }
        for(int[] edge : edges){
            int x = edge[0];
            int y = edge[1];
            int type = edge[2];
            tree.get(x).add(new Pipe(y, type));
            tree.get(y).add(new Pipe(x, type));
        }
        combi(0, -1);
        return answer;
    }

    //파이프 여닫기 경우의 수 구하기
    public void combi(int depth, int last){
        if(depth == k){
            answer = Math.max(answer, simulation());
            return;
        }
        for(int i = 1; i<=3; i++){
            if(i == last) continue;
            orders[depth] = i;
            combi(depth+1, i);
        }
    }

    //만든 조합을 시뮬레이션 했을 때 몇 개를 감염시키는지 반환
    public int simulation(){
        List<Integer> infected = new ArrayList<>();
        infected.add(infection);
        for(int i = 0; i<k; i++){
            infect(orders[i], infected);
        }

        return infected.size();
    }

    public void infect(int type, List<Integer> infected){
        Queue<Integer> q = new ArrayDeque<>();
        boolean[] visited = new boolean[n+1];
        for(int node : infected){
            q.offer(node);
            visited[node] = true;
        }

        while(!q.isEmpty()){
            int cur = q.poll();

            for(Pipe next : tree.get(cur)){
                if(!visited[next.to] && next.type == type){
                    infected.add(next.to);
                    q.offer(next.to);
                    visited[next.to] = true;
                }
            }
        }
    }

}