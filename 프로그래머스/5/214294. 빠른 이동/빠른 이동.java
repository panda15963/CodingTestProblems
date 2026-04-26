import java.util.*;

class Solution {

    int t, g, group[], time[], B[], e[][];
    List<Integer> adj[];
    Stack<Integer> s;
    boolean v[];

    int tarjan(int cur) {
        int ret = time[cur] = ++t;
        s.add(cur);

        for(int next : adj[cur])
            if(time[next] == 0) ret = Math.min(ret, tarjan(next));
            else if(group[next] == 0) ret = Math.min(ret, time[next]);

        if(ret == time[cur]) {
            g++;
            do group[s.peek()] = g;
            while(s.pop() != cur);
        }
        return ret;
    }
    boolean dfs(int a) {
        for(int b=1; b<=g; b++) {
            if(e[a][b] > 0 && !v[b]) {
                v[b] = true;
                if(B[b] == 0 || dfs(B[b])) {
                    B[b] = a;
                    return true;
                }
            }
        }
        return false;
    }
    int solution(int n, int[][] roads) {

        s = new Stack<Integer>();
        time = new int[n];
        group = new int[n];
        adj = new ArrayList[n];

        for(int i=0; i<n; i++)
            adj[i] = new ArrayList<>();

        for(int road[] : roads)
            adj[road[0]-1].add(road[1]-1);

        tarjan(0);
        e = new int[g+1][g+1];
        B = new int[g+1];
        v = new boolean[g+1];

        for(int i=0; i<n; i++)
            for(int j : adj[i])
                if(group[j] != group[i])
                    e[group[i]][group[j]]++;

        for(int k=1; k<=g; k++)
            for(int i=1; i<=g; i++)
                for(int j=1; j<=g; j++)
                    if(e[i][k] > 0 && e[k][j] > 0)
                        e[i][j] = 1;

        int ans = g-1;
        for(int i=1; i<=g; i++) {
            if(dfs(i)) {
                ans--;
                v = new boolean[g+1];
            }
        }
        return ans;
    }
}