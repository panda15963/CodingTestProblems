import java.util.*;

class Solution {
    int[][] moves = new int[][]{
        {0, 0}, // 버림
        {0, 1},
        {1, 0},
        {0, -1},
        {-1, 0}
    };
    public int[][] solution(int[][] board, int[][] commands) {
        int[][] index = new int[101][3];
        // [행, 열, 크기]
        // 행과 열은 좌상단 기준
        for(int i=0;i<board.length;i++){
            for(int j=0;j<board[i].length;){
                int id = board[i][j];
                if(id==0||index[id][2]!=0){
                    j++;
                    continue;
                }
                index[id][0] = i;
                index[id][1] = j;
                //크기 측정
                int size = 0;
                do {
                    j++;
                    size++;
                } while(j<board[i].length&&board[i][j]==id);
                index[id][2] = size;
            }
        }

        // 이동 (반드시 한 칸씩 이동)
        for(int i=0;i<commands.length;i++){
            int[] movePos = moves[commands[i][1]];
            ArrayDeque<Integer> moveApp = new ArrayDeque<>();
            Set<Integer> movedThisTurn = new HashSet<>(); // 중복 이동 방지
            moveApp.addLast(commands[i][0]);
            movedThisTurn.add(commands[i][0]);
            movedThisTurn.add(0); // 중복 검사시 편의를 위함
            ArrayDeque<Integer> moveOpposite = new ArrayDeque<>();
            while (moveApp.size()!=0||moveOpposite.size()!=0) {
                int target;
                if (moveApp.size()!=0){
                    target = moveApp.pollFirst();
                } else {
                    // 반대 방향으로의 이동은 가장 나중에 처리
                    // 나중에 처리하지 않으면 다른 App의 이동경로를 덮어씌움
                    movedThisTurn.clear();
                    movedThisTurn.add(0);
                    target = moveOpposite.pollFirst();
                    movedThisTurn.add(target);
                }

                // 삭제
                for(int j=Math.max(0,index[target][0]);
                    j<Math.min(board.length, index[target][0]+index[target][2]);
                    j++){
                    for(int k=Math.max(0,index[target][1]);
                        k<Math.min(board[0].length, index[target][1]+index[target][2]);
                        k++){
                        if(board[j][k]==target){
                            board[j][k]=0;
                        }
                    }
                }

                // 반대 방향으로 이동 필요 여부 확인
                if (movePos[1]==1 && index[target][1]+movePos[1]+index[target][2]>board[0].length) {
                    // 오른쪽 이동 중 반대편 이동 -> 왼쪽 끝으로
                    index[target][1] = -index[target][2];
                    for(int j=0;j<index[target][2];j++){
                        moveOpposite.addLast(target);
                    }
                    continue;
                } else if (movePos[0]==1 && index[target][0]+movePos[0]+index[target][2]>board.length) {
                    // 아래쪽 이동 중 반대편 이동 -> 위쪽 끝으로
                    index[target][0] = -index[target][2];
                    for(int j=0;j<index[target][2];j++){
                        moveOpposite.addLast(target);
                    }
                    continue;
                } else if (movePos[1]==-1 && index[target][1]+movePos[1]<0) {
                    // 왼쪽 이동 중 반대편 이동 -> 오른쪽 끝으로
                    index[target][1] = board[0].length;
                    for(int j=0;j<index[target][2];j++){
                        moveOpposite.addLast(target);
                    }
                    continue;
                } else if (movePos[0]==-1 && index[target][0]+movePos[0]<0) {
                    // 위쪽 이동 중 반대편 이동 -> 아래쪽 끝으로
                    index[target][0] = board.length;
                    for(int j=0;j<index[target][2];j++){
                        moveOpposite.addLast(target);
                    }
                    continue;
                } else {
                    // 보이는 방향 그대로 이동
                    index[target][0] = index[target][0]+movePos[0];
                    index[target][1] = index[target][1]+movePos[1];
                }

                // 생성
                Set<Integer> stompedApp = new HashSet<>();
                stompedApp.add(0);
                for(int j=Math.max(0,index[target][0]);
                    j<Math.min(board.length, index[target][0]+index[target][2]);
                    j++){
                    for(int k=Math.max(0,index[target][1]);
                        k<Math.min(board[0].length, index[target][1]+index[target][2]);
                        k++){
                        if(!movedThisTurn.contains(board[j][k])){
                            moveApp.addLast(board[j][k]);
                            movedThisTurn.add(board[j][k]);
                        }
                        board[j][k]=target;
                    }
                }
            }
        }
        return board;
    }
}