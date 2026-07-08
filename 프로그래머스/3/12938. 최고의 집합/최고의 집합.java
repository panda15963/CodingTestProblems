import java.util.Arrays;

class Solution {
    public int[] solution(int n, int s) {
        if (s < n) {
            return new int[] {-1};
        }
        
        int base = s / n;
        int remainder = s % n;
        
        int[] answer = new int[n];
        Arrays.fill(answer, base);
        
        for (int i = 0; i < remainder; i++) {
            answer[n - 1 - i]++;
        }
        
        return answer;
    }
}
