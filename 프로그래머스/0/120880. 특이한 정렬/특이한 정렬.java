import java.util.*;

class Solution {
    public int[] solution(int[] numlist, int n) {
        Integer[] arr = Arrays.stream(numlist).boxed().toArray(Integer[]::new);
        Arrays.sort(arr, (a, b) -> {
            int distA = Math.abs(a - n);
            int distB = Math.abs(b - n);
            if (distA == distB) return b - a;
            return distA - distB;
        });
        return Arrays.stream(arr).mapToInt(Integer::intValue).toArray();
    }
}
