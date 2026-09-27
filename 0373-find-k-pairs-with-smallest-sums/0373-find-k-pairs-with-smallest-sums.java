class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        // Min heap to store [sum, index1, index2]
        // Sorted by sum value (ascending order)
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
            Comparator.comparingInt(element -> element[0])
        );
      
        // Initialize heap with pairs (nums1[i], nums2[0]) for first k elements of nums1
        // This ensures we start with smallest possible sums
        for (int i = 0; i < Math.min(nums1.length, k); i++) {
            minHeap.offer(new int[] {
                nums1[i] + nums2[0],  // sum
                i,                    // index in nums1
                0                     // index in nums2
            });
        }
      
        // Result list to store k smallest pairs
        List<List<Integer>> result = new ArrayList<>();
      
        // Extract k smallest pairs from heap
        while (!minHeap.isEmpty() && k > 0) {
            // Get the pair with minimum sum
            int[] currentElement = minHeap.poll();
            int nums1Index = currentElement[1];
            int nums2Index = currentElement[2];
          
            // Add the pair to result
            result.add(Arrays.asList(nums1[nums1Index], nums2[nums2Index]));
            k--;
          
            // Add next pair with same nums1 element but next nums2 element
            // This maintains the property that we explore pairs in ascending order
            if (nums2Index + 1 < nums2.length) {
                minHeap.offer(new int[] {
                    nums1[nums1Index] + nums2[nums2Index + 1],  // new sum
                    nums1Index,                                 // same nums1 index
                    nums2Index + 1                              // next nums2 index
                });
            }
        }
      
        return result;
    }
}
