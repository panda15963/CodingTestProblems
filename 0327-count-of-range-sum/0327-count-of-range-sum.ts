// Binary Indexed Tree (Fenwick Tree) for efficient range sum queries
let n: number;
let tree: number[];

// Initialize the Binary Indexed Tree with size n
function initBIT(size: number): void {
    n = size;
    tree = Array(n + 1).fill(0);
}

// Update the BIT by adding value at position index
function update(index: number, value: number): void {
    while (index <= n) {
        tree[index] += value;
        // Move to next index by adding the rightmost set bit
        index += index & -index;
    }
}

// Query the prefix sum from index 1 to index
function query(index: number): number {
    let sum = 0;
    while (index > 0) {
        sum += tree[index];
        // Move to parent by removing the rightmost set bit
        index -= index & -index;
    }
    return sum;
}

// Binary search to find the leftmost position where nums[pos] >= target
// Returns 1-indexed position for BIT compatibility
function binarySearch(nums: number[], length: number, target: number): number {
    let left = 0;
    let right = length;
  
    while (left < right) {
        const mid = (left + right) >> 1;
        if (nums[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
  
    // Return 1-indexed position for BIT
    return left + 1;
}

// Count the number of range sums that lie in [lower, upper]
function countRangeSum(nums: number[], lower: number, upper: number): number {
    const length = nums.length;
  
    // Calculate prefix sums
    const prefixSums = Array(length + 1).fill(0);
    for (let i = 0; i < length; i++) {
        prefixSums[i + 1] = prefixSums[i] + nums[i];
    }
  
    // Create array with all possible values we need to track:
    // prefixSum[i], prefixSum[i] - lower, prefixSum[i] - upper
    let allValues: number[] = Array((length + 1) * 3);
    for (let i = 0, j = 0; i <= length; i++, j += 3) {
        allValues[j] = prefixSums[i];
        allValues[j + 1] = prefixSums[i] - lower;
        allValues[j + 2] = prefixSums[i] - upper;
    }
  
    // Sort and remove duplicates for coordinate compression
    allValues.sort((a, b) => a - b);
    let uniqueCount = 0;
    for (let i = 0; i < allValues.length; i++) {
        if (i === 0 || allValues[i] !== allValues[i - 1]) {
            allValues[uniqueCount++] = allValues[i];
        }
    }
    allValues = allValues.slice(0, uniqueCount);
  
    // Initialize BIT with compressed coordinate size
    initBIT(uniqueCount);
  
    let result = 0;
  
    // For each prefix sum, count valid range sums ending at current position
    for (const currentSum of prefixSums) {
        // Find range of valid previous prefix sums
        // We need: lower <= currentSum - prevSum <= upper
        // Which means: currentSum - upper <= prevSum <= currentSum - lower
        const leftBound = binarySearch(allValues, uniqueCount, currentSum - upper);
        const rightBound = binarySearch(allValues, uniqueCount, currentSum - lower);
      
        // Count how many valid previous sums exist
        result += query(rightBound) - query(leftBound - 1);
      
        // Add current sum to the BIT for future queries
        update(binarySearch(allValues, uniqueCount, currentSum), 1);
    }
  
    return result;
}
