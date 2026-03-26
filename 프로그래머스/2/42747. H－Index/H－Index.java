import java.util.*;

class Solution {
    public int solution(int[] citations) {
        Integer[] arr = Arrays.stream(citations).boxed().toArray(Integer[]::new);
        Arrays.sort(arr, (a, b) -> b - a);
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] < i + 1) return i;
        }
        return arr.length;
    }
}
