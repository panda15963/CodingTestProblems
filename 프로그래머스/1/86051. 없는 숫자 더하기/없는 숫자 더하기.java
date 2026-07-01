import java.util.*;

class Solution {
    public int solution(int[] numbers) {
        Set<Integer> set = new HashSet<>();
        for (int i = 0; i <= 9; i++) {
            set.add(i);
        }

        for (int num : numbers) {
            set.remove(num);
        }

        int sum = 0;
        for (int missing : set) {
            sum += missing;
        }

        return sum;
    }
}