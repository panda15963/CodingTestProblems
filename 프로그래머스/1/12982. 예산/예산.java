import java.util.*;

class Solution {

    public int solution(int[] d, int budget) {

        Arrays.sort(d);

        // 내림차순 정렬
        for (int i = 0; i < d.length / 2; i++) {
            int temp = d[i];
            d[i] = d[d.length - 1 - i];
            d[d.length - 1 - i] = temp;
        }

        int sum = 0;
        for (int money : d) {
            sum += money;
        }

        if (budget >= sum) {
            return d.length;
        }

        int removed = 0;

        for (int i = 0; i < d.length; i++) {

            int remain = sum - removed;

            if (budget >= remain) {
                return d.length - i;
            }

            removed += d[i];
        }

        return 0;
    }
}