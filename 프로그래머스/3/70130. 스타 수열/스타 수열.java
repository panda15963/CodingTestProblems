import java.util.*;

class Solution {
    public int solution(int[] a) {
        Map<Integer, Integer> countMap = new HashMap<>();

        // Counter(a)
        for (int num : a) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }

        int maxAnswer = 0;
        int n = a.length;

        if (n < 2) {
            return 0;
        }

        for (int star : countMap.keySet()) {

            // 가지치기
            if (countMap.get(star) * 2 <= maxAnswer) {
                continue;
            }

            Deque<Integer> deque = new ArrayDeque<>();
            for (int num : a) {
                deque.addLast(num);
            }

            int answer = 0;

            while (deque.size() > 1) {
                int elem1 = deque.pollFirst();
                int elem2 = deque.pollFirst();

                if ((elem1 == star || elem2 == star) && elem1 != elem2) {
                    answer += 2;
                } else {
                    deque.addFirst(elem2);
                }
            }

            maxAnswer = Math.max(maxAnswer, answer);
        }

        return maxAnswer;
    }
}