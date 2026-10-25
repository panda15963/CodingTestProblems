// Max heap implementation using array (stores smaller half of numbers)
let maxHeap: number[] = [];
// Min heap implementation using array (stores larger half of numbers)
let minHeap: number[] = [];
// Map to track numbers that need to be removed (lazy deletion)
let delayedRemoval: Map<number, number> = new Map();
// Actual size of maxHeap (excluding delayed removals)
let maxHeapSize: number = 0;
// Actual size of minHeap (excluding delayed removals)
let minHeapSize: number = 0;
// Window size
let windowSize: number = 0;

// Helper function to maintain max heap property after insertion
function pushMaxHeap(num: number): void {
    maxHeap.push(num);
    let childIndex = maxHeap.length - 1;
    while (childIndex > 0) {
        const parentIndex = Math.floor((childIndex - 1) / 2);
        if (maxHeap[parentIndex] >= maxHeap[childIndex]) break;
        [maxHeap[parentIndex], maxHeap[childIndex]] = [maxHeap[childIndex], maxHeap[parentIndex]];
        childIndex = parentIndex;
    }
}

// Helper function to maintain min heap property after insertion
function pushMinHeap(num: number): void {
    minHeap.push(num);
    let childIndex = minHeap.length - 1;
    while (childIndex > 0) {
        const parentIndex = Math.floor((childIndex - 1) / 2);
        if (minHeap[parentIndex] <= minHeap[childIndex]) break;
        [minHeap[parentIndex], minHeap[childIndex]] = [minHeap[childIndex], minHeap[parentIndex]];
        childIndex = parentIndex;
    }
}

// Helper function to maintain max heap property after removal
function popMaxHeap(): void {
    if (maxHeap.length === 0) return;
    maxHeap[0] = maxHeap[maxHeap.length - 1];
    maxHeap.pop();
    if (maxHeap.length === 0) return;
  
    let parentIndex = 0;
    while (true) {
        let largest = parentIndex;
        const leftChild = 2 * parentIndex + 1;
        const rightChild = 2 * parentIndex + 2;
      
        if (leftChild < maxHeap.length && maxHeap[leftChild] > maxHeap[largest]) {
            largest = leftChild;
        }
        if (rightChild < maxHeap.length && maxHeap[rightChild] > maxHeap[largest]) {
            largest = rightChild;
        }
        if (largest === parentIndex) break;
      
        [maxHeap[parentIndex], maxHeap[largest]] = [maxHeap[largest], maxHeap[parentIndex]];
        parentIndex = largest;
    }
}

// Helper function to maintain min heap property after removal
function popMinHeap(): void {
    if (minHeap.length === 0) return;
    minHeap[0] = minHeap[minHeap.length - 1];
    minHeap.pop();
    if (minHeap.length === 0) return;
  
    let parentIndex = 0;
    while (true) {
        let smallest = parentIndex;
        const leftChild = 2 * parentIndex + 1;
        const rightChild = 2 * parentIndex + 2;
      
        if (leftChild < minHeap.length && minHeap[leftChild] < minHeap[smallest]) {
            smallest = leftChild;
        }
        if (rightChild < minHeap.length && minHeap[rightChild] < minHeap[smallest]) {
            smallest = rightChild;
        }
        if (smallest === parentIndex) break;
      
        [minHeap[parentIndex], minHeap[smallest]] = [minHeap[smallest], minHeap[parentIndex]];
        parentIndex = smallest;
    }
}

// Initialize with window size k
function initializeMedianFinder(k: number): void {
    windowSize = k;
    maxHeap = [];
    minHeap = [];
    delayedRemoval = new Map();
    maxHeapSize = 0;
    minHeapSize = 0;
}

// Remove delayed elements from the top of max heap
function pruneMaxHeap(): void {
    // Keep removing top elements that are marked for deletion
    while (maxHeap.length > 0 && delayedRemoval.has(maxHeap[0]) && delayedRemoval.get(maxHeap[0])! > 0) {
        const topValue = maxHeap[0];
        const count = delayedRemoval.get(topValue)!;
        // Decrement the delayed count
        if (count === 1) {
            // Remove from map if count reaches 0
            delayedRemoval.delete(topValue);
        } else {
            delayedRemoval.set(topValue, count - 1);
        }
        popMaxHeap();
    }
}

// Remove delayed elements from the top of min heap
function pruneMinHeap(): void {
    // Keep removing top elements that are marked for deletion
    while (minHeap.length > 0 && delayedRemoval.has(minHeap[0]) && delayedRemoval.get(minHeap[0])! > 0) {
        const topValue = minHeap[0];
        const count = delayedRemoval.get(topValue)!;
        // Decrement the delayed count
        if (count === 1) {
            // Remove from map if count reaches 0
            delayedRemoval.delete(topValue);
        } else {
            delayedRemoval.set(topValue, count - 1);
        }
        popMinHeap();
    }
}

// Rebalance the two heaps to maintain the invariant:
// maxHeap size should be equal to minHeap size (for even k)
// or maxHeap size should be minHeap size + 1 (for odd k)
function rebalance(): void {
    // If maxHeap has more than one extra element, move top to minHeap
    if (maxHeapSize > minHeapSize + 1) {
        pushMinHeap(maxHeap[0]);
        popMaxHeap();
        maxHeapSize--;
        minHeapSize++;
        // Prune maxHeap after removing top
        pruneMaxHeap();
    } 
    // If minHeap has more elements, move top to maxHeap
    else if (maxHeapSize < minHeapSize) {
        pushMaxHeap(minHeap[0]);
        popMinHeap();
        maxHeapSize++;
        minHeapSize--;
        // Prune minHeap after removing top
        pruneMinHeap();
    }
}

// Add a new number to the data structure
function addNum(num: number): void {
    // Add to maxHeap if it's empty or num is less than or equal to max of maxHeap
    if (maxHeap.length === 0 || num <= maxHeap[0]) {
        pushMaxHeap(num);
        maxHeapSize++;
    } else {
        // Otherwise add to minHeap
        pushMinHeap(num);
        minHeapSize++;
    }
    // Rebalance the two heaps to maintain size property
    rebalance();
}

// Remove a number from the data structure (lazy deletion)
function removeNum(num: number): void {
    // Mark the number for delayed removal
    delayedRemoval.set(num, (delayedRemoval.get(num) || 0) + 1);
  
    // Update size counter based on which heap the number belongs to
    if (num <= maxHeap[0]) {
        maxHeapSize--;
        // If the number is at the top, prune immediately
        if (num === maxHeap[0]) {
            pruneMaxHeap();
        }
    } else {
        minHeapSize--;
        // If the number is at the top, prune immediately
        if (num === minHeap[0]) {
            pruneMinHeap();
        }
    }
    // Rebalance the two heaps after removal
    rebalance();
}

// Find and return the median of current numbers
function findMedian(): number {
    // If window size is odd, return the top of maxHeap
    // If even, return the average of tops of both heaps
    return (windowSize & 1) ? maxHeap[0] : (maxHeap[0] + minHeap[0]) / 2.0;
}

// Find medians of all k-sized sliding windows in the array
function medianSlidingWindow(nums: number[], k: number): number[] {
    // Initialize MedianFinder with window size k
    initializeMedianFinder(k);
  
    // Add first k elements to build initial window
    for (let i = 0; i < k; i++) {
        addNum(nums[i]);
    }
  
    // Store the median of first window
    const result: number[] = [findMedian()];
  
    // Slide the window through the rest of the array
    for (let i = k; i < nums.length; i++) {
        // Add new element entering the window
        addNum(nums[i]);
        // Remove element leaving the window
        removeNum(nums[i - k]);
        // Calculate and store median of current window
        result.push(findMedian());
    }
  
    return result;
}
