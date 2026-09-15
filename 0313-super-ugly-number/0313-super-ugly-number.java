class Solution {
    public int nthSuperUglyNumber(int n, int[] primes) {
        // Min heap to store and retrieve the smallest super ugly number
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
      
        // Start with 1 as the first super ugly number
        minHeap.offer(1);
      
        int currentNumber = 0;
      
        // Generate n super ugly numbers
        while (n-- > 0) {
            // Extract the smallest number from the heap
            currentNumber = minHeap.poll();
          
            // Remove duplicates by polling all equal values
            while (!minHeap.isEmpty() && minHeap.peek() == currentNumber) {
                minHeap.poll();
            }
          
            // Generate new super ugly numbers by multiplying current with each prime
            for (int prime : primes) {
                // Check for overflow before multiplication
                if (prime <= Integer.MAX_VALUE / currentNumber) {
                    minHeap.offer(prime * currentNumber);
                }
              
                // Optimization: if current number is divisible by this prime,
                // skip remaining primes to avoid generating redundant numbers
                if (currentNumber % prime == 0) {
                    break;
                }
            }
        }
      
        return currentNumber;
    }
}
