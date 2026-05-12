import java.util.*;

class Solution {
    public long solution(int[] weights) {
        long answer = 0;
        Arrays.sort(weights);
        Map<Double, Integer> map = new HashMap<>();

        for (int w : weights) {
            double w1 = (double) w;
            double w2 = w1 * 2 / 3;
            double w3 = w1 * 2 / 4;
            double w4 = w1 * 3 / 4;

            // 이미 map에 짝꿍이 존재하면 개수 추가
            if (map.containsKey(w1)) answer += map.get(w1);
            if (map.containsKey(w2)) answer += map.get(w2);
            if (map.containsKey(w3)) answer += map.get(w3);
            if (map.containsKey(w4)) answer += map.get(w4);

            map.put(w1, map.getOrDefault(w1, 0) + 1);
        }
        return answer;
    }
}
