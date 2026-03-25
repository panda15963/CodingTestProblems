import java.util.*;

class Solution {
    public int solution(int[][] jobs) {
        Arrays.sort(jobs, (a, b) -> {
            if (a[0] == b[0]) return a[1] - b[1];
            return a[0] - b[0];
        });

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> {
            if (a[1] == b[1]) {
                if (a[0] == b[0]) return a[2] - b[2];
                return a[0] - b[0];
            }
            return a[1] - b[1];
        });

        int time = 0;
        int idx = 0;
        int total = 0;
        int n = jobs.length;
        int jobNo = 0;

        while (idx < n || !pq.isEmpty()) {
            while (idx < n && jobs[idx][0] <= time) {
                pq.offer(new int[]{jobs[idx][0], jobs[idx][1], jobNo++});
                idx++;
            }

            if (pq.isEmpty()) {
                time = jobs[idx][0];
                continue;
            }

            int[] cur = pq.poll();
            time += cur[1];
            total += time - cur[0];
        }

        return total / n;
    }
}
