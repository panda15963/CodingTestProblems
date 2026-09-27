function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    const m = nums1.length;
    const n = nums2.length;
    const result: number[][] = [];
  
    // Min-heap to store pairs of indices [i, j] where i is index in nums1 and j is index in nums2
    // Using a custom comparator based on the sum of pairs
    const minHeap: [number, number][] = [];
  
    // Comparator function to maintain min-heap property based on sum of pairs
    const compareFn = (a: [number, number], b: [number, number]): number => {
        // Compare sums: nums1[a[0]] + nums2[a[1]] vs nums1[b[0]] + nums2[b[1]]
        return (nums1[a[0]] + nums2[a[1]]) - (nums1[b[0]] + nums2[b[1]]);
    };
  
    // Helper function to add element to heap and maintain heap property
    const heapPush = (item: [number, number]): void => {
        minHeap.push(item);
        // Bubble up to maintain min-heap property
        let currentIndex = minHeap.length - 1;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (compareFn(minHeap[currentIndex], minHeap[parentIndex]) < 0) {
                [minHeap[currentIndex], minHeap[parentIndex]] = [minHeap[parentIndex], minHeap[currentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    };
  
    // Helper function to extract minimum element from heap
    const heapPop = (): [number, number] | undefined => {
        if (minHeap.length === 0) return undefined;
        if (minHeap.length === 1) return minHeap.pop();
      
        const min = minHeap[0];
        minHeap[0] = minHeap.pop()!;
      
        // Bubble down to maintain min-heap property
        let currentIndex = 0;
        while (true) {
            const leftChild = 2 * currentIndex + 1;
            const rightChild = 2 * currentIndex + 2;
            let smallest = currentIndex;
          
            if (leftChild < minHeap.length && compareFn(minHeap[leftChild], minHeap[smallest]) < 0) {
                smallest = leftChild;
            }
            if (rightChild < minHeap.length && compareFn(minHeap[rightChild], minHeap[smallest]) < 0) {
                smallest = rightChild;
            }
          
            if (smallest !== currentIndex) {
                [minHeap[currentIndex], minHeap[smallest]] = [minHeap[smallest], minHeap[currentIndex]];
                currentIndex = smallest;
            } else {
                break;
            }
        }
      
        return min;
    };
  
    // Initialize heap with pairs (i, 0) for first min(k, m) elements from nums1
    // paired with the first element of nums2
    for (let i = 0; i < Math.min(k, m); i++) {
        heapPush([i, 0]);
    }
  
    // Extract k smallest pairs
    while (k > 0 && minHeap.length > 0) {
        // Get the pair with minimum sum
        const [index1, index2] = heapPop()!;
      
        // Add the actual values to result
        result.push([nums1[index1], nums2[index2]]);
      
        // If there's a next element in nums2, add the pair (index1, index2 + 1) to heap
        // This ensures we explore all possible pairs in sorted order
        if (index2 + 1 < n) {
            heapPush([index1, index2 + 1]);
        }
      
        k--;
    }
  
    return result;
}
