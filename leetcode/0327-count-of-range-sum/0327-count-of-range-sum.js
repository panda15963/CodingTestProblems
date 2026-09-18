// Binary Indexed Tree (Fenwick Tree)
let n;
let tree;

// Initialize the Binary Indexed Tree
function initBIT(size) {
    n = size;
    tree = new Array(n + 1).fill(0);
}

// Update the BIT
function update(index, value) {
    while (index <= n) {
        tree[index] += value;
        index += index & -index;
    }
}

// Query prefix sum
function query(index) {
    let sum = 0;

    while (index > 0) {
        sum += tree[index];
        index -= index & -index;
    }

    return sum;
}

// Binary search to find the leftmost position
// where nums[pos] >= target
function binarySearch(nums, length, target) {
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

// Count range sums in [lower, upper]
var countRangeSum = function(nums, lower, upper) {
    const length = nums.length;

    // Calculate prefix sums
    const prefixSums = new Array(length + 1).fill(0);

    for (let i = 0; i < length; i++) {
        prefixSums[i + 1] = prefixSums[i] + nums[i];
    }

    // Coordinate compression values
    const allValues = new Array((length + 1) * 3);

    for (let i = 0, j = 0; i <= length; i++, j += 3) {
        allValues[j] = prefixSums[i];
        allValues[j + 1] = prefixSums[i] - lower;
        allValues[j + 2] = prefixSums[i] - upper;
    }

    // Sort
    allValues.sort((a, b) => a - b);

    // Remove duplicates
    let uniqueCount = 0;

    for (let i = 0; i < allValues.length; i++) {
        if (i === 0 || allValues[i] !== allValues[i - 1]) {
            allValues[uniqueCount++] = allValues[i];
        }
    }

    allValues.length = uniqueCount;

    // Initialize BIT
    initBIT(uniqueCount);

    let result = 0;

    // Process each prefix sum
    for (const currentSum of prefixSums) {
        const leftBound = binarySearch(
            allValues,
            uniqueCount,
            currentSum - upper
        );

        const rightBound = binarySearch(
            allValues,
            uniqueCount,
            currentSum - lower
        );

        // Count valid previous prefix sums
        result += query(rightBound) - query(leftBound - 1);

        // Add current prefix sum
        const currentIndex = binarySearch(
            allValues,
            uniqueCount,
            currentSum
        );

        update(currentIndex, 1);
    }

    return result;
};