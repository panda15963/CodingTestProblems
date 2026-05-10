class Solution {
    private final char O = 'O';
    private final char X = 'X';
    public int solution(String[] board) {
        int oCnt = 0;
        int xCnt = 0;
        
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i].charAt(j) == O) {
                    oCnt++;
                } else if (board[i].charAt(j) == X) {
                    xCnt++;
                }
            }
        }
        
        // 후공이 선공보다 먼저 나온경우
        if (xCnt > oCnt) {
            return 0;
        }
        
        // 순서대로 하나씩 증가하지 않은 경우
        if (oCnt - xCnt > 1) {
            return 0;
        }
        
        // 게임이 끝났는데 계속 진행된 경우
        boolean oWin = getWinner(board, O);
        boolean xWin = getWinner(board, X);
        if (oWin && xWin) {
            return 0;
        }
        if (oWin && oCnt <= xCnt) {
            return 0;
        }
        if (xWin && oCnt != xCnt) {
            return 0;
        }
        
        return 1;
    }
    
    public boolean getWinner(String[] board, char value) {
        for (int i = 0; i < 3; i++) {
            // 가로로 일치하는 경우
            if (board[i].charAt(0) == value 
                && board[i].charAt(0) == board[i].charAt(1) 
                && board[i].charAt(1) == board[i].charAt(2)) {
                return true;
            }
            // 세로로 일치하는 경우
            if (board[0].charAt(i) == value
                && board[0].charAt(i) == board[1].charAt(i)
                && board[1].charAt(i) == board[2].charAt(i)) {
                return true;
            }
        }
        // 대각선 일치
        if (board[0].charAt(0) == value
            && board[0].charAt(0) == board[1].charAt(1)
            && board[1].charAt(1) == board[2].charAt(2)) {
            return true;
        }
        
        if (board[0].charAt(2) == value
            && board[0].charAt(2) == board[1].charAt(1)
            && board[1].charAt(1) == board[2].charAt(0)) {
            return true;
        }
        return false;
    }
}