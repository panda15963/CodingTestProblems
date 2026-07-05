import java.util.*;

class Solution {

    static class Stone {
        int idx;
        int value;

        Stone(int idx, int value) {
            this.idx = idx;
            this.value = value;
        }
    }

    public int solution(int[] stones, int k) {

        PriorityQueue<Stone> pq = new PriorityQueue<>(
                (a, b) -> b.value - a.value
        );

        for (int i = 0; i < k; i++) {
            pq.offer(new Stone(i, stones[i]));
        }

        int answer = pq.peek().value;

        int checkIndex = k;

        while (checkIndex < stones.length) {

            pq.offer(new Stone(checkIndex, stones[checkIndex]));
            checkIndex++;

            while (pq.peek().idx < checkIndex - k) {
                pq.poll();
            }

            answer = Math.min(answer, pq.peek().value);
        }

        return answer;
    }
}