import java.util.*;

class Solution {
    // 레버~시작점 거리와 레버~출구 거리의 합
    public int solution(String[] maps) {


        int R = maps.length;
        int C = maps[0].length();
        int[][] time = new int[R][C];
        Queue<Integer> q = new ArrayDeque<>();

        for(int r=0; r<R; r++){
            for(int c=0; c<C; c++){
                if(maps[r].charAt(c)=='L'){
                    q.add(r);
                    q.add(c);
                }
                else{
                    time[r][c] = Integer.MAX_VALUE;
                }
            }
        }

        int toStart = -1;
        int toEnd = -1;

        int[][] dir = new int[][]{{-1,0},{1,0},{0,-1},{0,1}};
        while(toStart==-1 || toEnd==-1){
            if(q.size()==0) return -1;
            int r = q.poll();
            int c = q.poll();
            int t = time[r][c]+1;
            for(int i=0; i<4; i++){
                int nextR = r+dir[i][0];
                int nextC = c+dir[i][1];
                if(nextR>=0 && nextR<R && nextC>=0 && nextC<C){
                    if(maps[nextR].charAt(nextC)!='X' && time[nextR][nextC]>t){
                        time[nextR][nextC] = t;
                        q.add(nextR);
                        q.add(nextC);
                        if(maps[nextR].charAt(nextC)=='S' && toStart==-1){
                            toStart = t;
                        }
                        if(maps[nextR].charAt(nextC)=='E' && toEnd==-1){
                            toEnd = t;
                        }
                    }
                }
            }
        }

        return toStart + toEnd;
    }
}