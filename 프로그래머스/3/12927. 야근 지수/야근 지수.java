import java.util.*;

class Solution {
    public long solution(int n, int[] works) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
        long answer = 0;
        long totalWorks = 0;
        
        for (int work : works){
            pq.add(work);
            totalWorks += work;
        }
        
        if (totalWorks <= n) 
            return 0;
        
               
        for(int i = 0; i < n; i++) {
            int top = pq.poll();
            pq.add(top - 1);
        }
        
        while(!pq.isEmpty()) {
            int work = pq.poll();
            answer += (long) work * work;
        }
        
        return answer;
    }
}