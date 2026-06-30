import java.util.*;

class Solution {
    public int solution(int[][] board, int[][] skill) {
        int answer = 0;
        
        // out of bound 방지
        int[][] sum = new int[board.length+1][board[0].length+1];
        
        // sum 배열 0으로 초기화
        for(int i = 0; i < board.length+1; i++) Arrays.fill(sum[i],0);
        
        for(int[] info : skill){
            int r1 = info[1];
            int c1 = info[2];
            
            int r2 = info[3];
            int c2 = info[4];
            // type == 1 이면 degree에 -1을 붙임
            int degree = (info[0] == 1)? -info[5] : info[5];
            
            // 위에서 일반화한 공식
            sum[r1][c1] += degree;
            sum[r1][c2+1] += -degree;
            sum[r2+1][c1] += -degree;
            sum[r2+1][c2+1] += degree;
        }
        
        // 세로로 누적합
        for(int col = 0; col < board[0].length+1; col++){
            for(int row = 0; row < board.length; row++){
                sum[row+1][col] += sum[row][col];
            }
        }
        
        // 가로로 누적합
        for(int row = 0; row < board.length+1; row++){
            for(int col = 0; col < board[0].length; col++){
                sum[row][col+1] += sum[row][col];
            }
        }
        
        // 다 더핸 sum 배열과 기존 board 배열을 더함
        for(int row = 0; row < board.length; row++){
            for(int col = 0; col < board[0].length; col++){
                board[row][col] += sum[row][col];
                // 해당칸의 값이 0을 넘으면 +1
                if(board[row][col] > 0) answer++;
            }
        }
        return answer;
    }
}