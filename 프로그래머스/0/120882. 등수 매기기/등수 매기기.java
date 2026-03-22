import java.util.*;

class Solution {
    public int[] solution(int[][] score) {
        int n = score.length;
        double[] avg = new double[n];
        for (int i = 0; i < n; i++) {
            avg[i] = (score[i][0] + score[i][1]) / 2.0;
        }
        
        Integer[] indices = new Integer[n];
        for (int i = 0; i < n; i++) indices[i] = i;
        
        Arrays.sort(indices, (a, b) -> Double.compare(avg[b], avg[a]));
        
        int[] answer = new int[n];
        int rank = 1;
        answer[indices[0]] = 1;
        for (int i = 1; i < n; i++) {
            if (avg[indices[i]] == avg[indices[i - 1]]) {
                answer[indices[i]] = rank;
            } else {
                rank = i + 1;
                answer[indices[i]] = rank;
            }
        }
        return answer;
    }
}
