import java.util.*;

class Solution {
    public int[] solution(int[] num_list, int n) {
        int[] after = Arrays.copyOfRange(num_list, n, num_list.length);
        int[] before = Arrays.copyOfRange(num_list, 0, n);
        
        int[] answer = new int[num_list.length];
        System.arraycopy(after, 0, answer, 0, after.length);
        System.arraycopy(before, 0, answer, after.length, before.length);
        return answer;
    }
}
