class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = capital.length;
      
        // Min heap to store projects sorted by capital requirement
        // Each element is [capital required, profit]
        PriorityQueue<int[]> minCapitalHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
      
        // Add all projects to the min heap
        for (int i = 0; i < n; i++) {
            minCapitalHeap.offer(new int[] {capital[i], profits[i]});
        }
      
        // Max heap to store available projects sorted by profit (descending)
        PriorityQueue<Integer> maxProfitHeap = new PriorityQueue<>((a, b) -> b - a);
      
        // Select up to k projects
        while (k-- > 0) {
            // Move all affordable projects from minCapitalHeap to maxProfitHeap
            while (!minCapitalHeap.isEmpty() && minCapitalHeap.peek()[0] <= w) {
                maxProfitHeap.offer(minCapitalHeap.poll()[1]);
            }
          
            // If no affordable projects available, stop early
            if (maxProfitHeap.isEmpty()) {
                break;
            }
          
            // Select the most profitable project and add its profit to capital
            w += maxProfitHeap.poll();
        }
      
        return w;
    }
}
