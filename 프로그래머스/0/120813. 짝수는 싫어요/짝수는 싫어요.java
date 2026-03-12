import java.util.*;

class Solution {
    public int[] solution(int n) {
        int size = (n + 1) / 2;
        int[] answer = new int[size];
        for (int i = 0; i < size; i++) {
            answer[i] = 2 * i + 1;
            if (answer[i] > n) break;
        }
        return answer;
    }
}
