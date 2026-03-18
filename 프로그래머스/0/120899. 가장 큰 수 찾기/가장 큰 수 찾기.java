import java.util.*;

class Solution {
    public int[] solution(int[] array) {
        int max = 0;
        int idx = 0;
        for (int i = 0; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i];
                idx = i;
            }
        }
        return new int[]{max, idx};
    }
}
