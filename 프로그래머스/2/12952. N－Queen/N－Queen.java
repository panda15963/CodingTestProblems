class Solution {
    private int cnt = 0;
    private int N;
    private boolean[][] visited;
    public int solution(int n) {
        N = n;
        visited = new boolean[n][n];
        n_queen(0);
        return cnt;
    }
    
    private void n_queen(int queen) {
        // 리턴 조건: 마지막 퀸을 놨을 때
        if(queen == N){
            cnt++;
            return;
        }
        
        for(int i = 0; i < N; i++) {
            if(canPlace(queen, i)) {
                visited[queen][i] = true; // 퀸 배치
                n_queen(queen + 1);
                visited[queen][i] = false; // 퀸 배치 해제
            }
        }
    }
    
    private boolean canPlace(int row, int col) {
        // 세로
        for(int i = 0; i < N; i++) {
            if(i != row && visited[i][col]){
                return false;   
            }
        }
        
        // 대각선
        for(int i = 0; i < N; i++) {
            for(int j = 0; j < N; j++) {
                
                // 1. 우측 대각선: 뺀게 같음
                // 2. 좌측 대각선: 더한게 같음
                if(row - col == i - j || row + col == i + j) {
                    if(visited[i][j]){
                        return false;
                    }
                }
            }
        }
        
        return true;
    }
}