/**
 * A data structure that maintains the median of a sliding window of size k.
 * Uses two heaps (max heap for smaller half, min heap for larger half) to efficiently track the median.
 * Implements lazy deletion to handle element removal efficiently.
 */
class MedianFinder {
    // Max heap to store the smaller half of numbers
    private PriorityQueue<Integer> smallerHalf = new PriorityQueue<>(Comparator.reverseOrder());
  
    // Min heap to store the larger half of numbers
    private PriorityQueue<Integer> largerHalf = new PriorityQueue<>();
  
    // Map to track numbers that need to be removed (lazy deletion)
    private Map<Integer, Integer> delayedRemovals = new HashMap<>();
  
    // Actual size of smaller half (excluding delayed removals)
    private int smallerHalfSize;
  
    // Actual size of larger half (excluding delayed removals)
    private int largerHalfSize;
  
    // Window size
    private int windowSize;

    /**
     * Constructor to initialize the MedianFinder with window size k
     * @param k the size of the sliding window
     */
    public MedianFinder(int k) {
        this.windowSize = k;
    }

    /**
     * Adds a number to the data structure
     * @param num the number to add
     */
    public void addNum(int num) {
        // Determine which heap to add the number to
        if (smallerHalf.isEmpty() || num <= smallerHalf.peek()) {
            smallerHalf.offer(num);
            ++smallerHalfSize;
        } else {
            largerHalf.offer(num);
            ++largerHalfSize;
        }
      
        // Maintain heap balance after insertion
        rebalance();
    }

    /**
     * Finds and returns the median of current window
     * @return the median value
     */
    public double findMedian() {
        // If window size is odd, return the top of smaller half
        // If window size is even, return average of tops of both heaps
        return (windowSize & 1) == 1 
            ? smallerHalf.peek() 
            : ((double) smallerHalf.peek() + largerHalf.peek()) / 2;
    }

    /**
     * Removes a number from the data structure (lazy deletion)
     * @param num the number to remove
     */
    public void removeNum(int num) {
        // Mark the number for delayed removal
        delayedRemovals.merge(num, 1, Integer::sum);
      
        // Update size and prune if necessary
        if (num <= smallerHalf.peek()) {
            --smallerHalfSize;
            if (num == smallerHalf.peek()) {
                prune(smallerHalf);
            }
        } else {
            --largerHalfSize;
            if (num == largerHalf.peek()) {
                prune(largerHalf);
            }
        }
      
        // Maintain heap balance after removal
        rebalance();
    }

    /**
     * Removes all delayed elements from the top of the given heap
     * @param heap the heap to prune
     */
    private void prune(PriorityQueue<Integer> heap) {
        while (!heap.isEmpty() && delayedRemovals.containsKey(heap.peek())) {
            // Decrement the delayed removal count
            if (delayedRemovals.merge(heap.peek(), -1, Integer::sum) == 0) {
                delayedRemovals.remove(heap.peek());
            }
            heap.poll();
        }
    }

    /**
     * Rebalances the two heaps to maintain the median property
     * Ensures that smallerHalf has at most one more element than largerHalf
     */
    private void rebalance() {
        // If smaller half has more than one extra element, move to larger half
        if (smallerHalfSize > largerHalfSize + 1) {
            largerHalf.offer(smallerHalf.poll());
            --smallerHalfSize;
            ++largerHalfSize;
            prune(smallerHalf);
        } 
        // If larger half has more elements, move to smaller half
        else if (smallerHalfSize < largerHalfSize) {
            smallerHalf.offer(largerHalf.poll());
            --largerHalfSize;
            ++smallerHalfSize;
            prune(largerHalf);
        }
    }
}

/**
 * Solution class for the Sliding Window Median problem
 */
class Solution {
    /**
     * Calculates the median for each sliding window of size k in the given array
     * @param nums the input array
     * @param k the size of the sliding window
     * @return array containing the median of each window
     */
    public double[] medianSlidingWindow(int[] nums, int k) {
        // Initialize the MedianFinder with window size k
        MedianFinder medianFinder = new MedianFinder(k);
      
        // Add the first k elements to initialize the window
        for (int i = 0; i < k; ++i) {
            medianFinder.addNum(nums[i]);
        }
      
        // Prepare result array
        int n = nums.length;
        double[] result = new double[n - k + 1];
      
        // Calculate median for the first window
        result[0] = medianFinder.findMedian();
      
        // Slide the window and calculate median for each position
        for (int i = k; i < n; ++i) {
            medianFinder.addNum(nums[i]);                    // Add new element
            medianFinder.removeNum(nums[i - k]);             // Remove oldest element
            result[i - k + 1] = medianFinder.findMedian();   // Store median
        }
      
        return result;
    }
}
