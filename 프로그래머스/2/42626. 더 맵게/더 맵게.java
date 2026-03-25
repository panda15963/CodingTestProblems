import java.util.PriorityQueue;

class Solution {
    public int solution(int[] scoville, int K) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        for (int s : scoville) {
            pq.offer(s);
        }

        int count = 0;

        while (pq.size() >= 2 && pq.peek() < K) {
            int first = pq.poll();
            int second = pq.poll();
            pq.offer(first + second * 2);
            count++;
        }

        return pq.peek() >= K ? count : -1;
    }
}
