class Solution {
    int cnt;
    public int solution(int n) {
        dfs(n*2, 1, 1);
        return cnt;
    }
    public void dfs(int max, int level, int sum){
        if(sum < 0) return;
        
        if(level == max){
            if(sum == 0)
                cnt++;
            return;
        }
        
        dfs(max, level+1, sum + 1);
        dfs(max, level+1, sum - 1);
    }
}