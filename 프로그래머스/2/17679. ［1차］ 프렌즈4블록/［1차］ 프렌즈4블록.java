import java.util.HashSet;
import java.util.Set;
import java.util.Stack;

class Solution {
    public static char[][] gameBoard; 
    public int solution(int m, int n, String[] board) {
        int answer = 0;
        gameBoard = new char[m][n];

        for (int i = 0; i < m; i++) {
            gameBoard[i] = board[i].toCharArray();
        }

        while (true) {
            Set<String> temp = new HashSet<>();     // 삭제 할 블록 임시 저장
            for (int i = 0; i < m - 1; i++) {
                for (int j = 0; j < n - 1; j++) {
                    // 2x2 블록 완성
                    if (check(gameBoard[i][j], gameBoard[i+1][j], gameBoard[i][j+1], gameBoard[i+1][j+1])) {
                        temp.add(i + "," + j);
                        temp.add((i + 1) + "," + j);
                        temp.add(i + "," + (j + 1));
                        temp.add((i + 1) + "," + (j + 1));
                    }
                }
            }

            int removedCnt = temp.size();
            if (removedCnt == 0) break;
            answer += removedCnt;

            blockDown(temp, m, n);
        }
        return answer;
    }

    private void blockDown(Set<String> temp, int m, int n) {
        for(String str : temp){
            int i = Integer.parseInt(str.split(",")[0]);
            int j = Integer.parseInt(str.split(",")[1]);
            gameBoard[i][j] = ' ';  // 공백으로 초기화
        }

        for (int j = 0; j < n; j++) {
            Stack<Character> stack = new Stack<>();
            for (int i = 0; i < m; i++) {
                if(gameBoard[i][j] != ' '){
                    stack.push(gameBoard[i][j]);
                }
            }

            for (int k = m - 1; k >= 0; k--) {
                if (!stack.empty()) {
                    gameBoard[k][j] = stack.pop();
                } else {
                    gameBoard[k][j] = ' ';  // 공백으로 채우기
                }
            }
        }
    }

    private boolean check(char ch1, char ch2, char ch3, char ch4) {
        if (ch1 != ' ' && ch1 == ch2 && ch1 == ch3 && ch1 == ch4) {
            return true;
        }
        return false;
    }
}