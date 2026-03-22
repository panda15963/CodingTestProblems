class Solution {
    public int solution(int[][] board) {
        int n = board.length;
        int[][] deltas = {{-1,-1}, {-1,0}, {-1,1}, {0,-1}, {0,1}, {1,-1}, {1,0}, {1,1}};
        
        int safe = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 1) continue;
                
                boolean danger = false;
                for (int[] d : deltas) {
                    int ni = i + d[0], nj = j + d[1];
                    if (ni >= 0 && ni < n && nj >= 0 && nj < n && board[ni][nj] == 1) {
                        danger = true;
                        break;
                    }
                }
                if (!danger) safe++;
            }
        }
        return safe;
    }
}