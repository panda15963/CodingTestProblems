import java.util.*;

class Solution {
    public int[] solution(int[] array, int[][] commands) {
        int[] answer = new int[commands.length];
        for (int c = 0; c < commands.length; c++) {
            int i = commands[c][0] - 1;
            int j = commands[c][1];
            int k = commands[c][2] - 1;
            
            int[] sub = Arrays.copyOfRange(array, i, j);
            Arrays.sort(sub);
            answer[c] = sub[k];
        }
        return answer;
    }
}
