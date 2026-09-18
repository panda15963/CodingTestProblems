import java.util.Arrays;

/**
 * Binary Indexed Tree (Fenwick Tree) for efficient range sum queries and updates
 */
class BinaryIndexedTree {
    private int size;
    private int[] tree;

    /**
     * Initialize the Binary Indexed Tree with given size
     * @param size the size of the tree (1-indexed)
     */
    public BinaryIndexedTree(int size) {
        this.size = size;
        this.tree = new int[size + 1];
    }

    /**
     * Update the value at index by adding delta
     * @param index the 1-based index to update
     * @param delta the value to add
     */
    public void update(int index, int delta) {
        while (index <= size) {
            tree[index] += delta;
            // Move to next index by adding the least significant bit
            index += index & -index;
        }
    }

    /**
     * Query the prefix sum from index 1 to index
     * @param index the 1-based index to query up to
     * @return the prefix sum
     */
    public int query(int index) {
        int sum = 0;
        while (index > 0) {
            sum += tree[index];
            // Move to parent index by removing the least significant bit
            index -= index & -index;
        }
        return sum;
    }
}

/**
 * Solution for counting range sums within a given range [lower, upper]
 */
class Solution {
    /**
     * Count the number of range sums that lie in [lower, upper]
     * @param nums the input array
     * @param lower the lower bound of the range
     * @param upper the upper bound of the range
     * @return the count of valid range sums
     */
    public int countRangeSum(int[] nums, int lower, int upper) {
        int n = nums.length;
      
        // Calculate prefix sums
        long[] prefixSums = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSums[i + 1] = prefixSums[i] + nums[i];
        }
      
        // Create array with all possible values we need to track:
        // prefixSum[i], prefixSum[i] - lower, prefixSum[i] - upper
        long[] allValues = new long[n * 3 + 3];
        for (int i = 0, j = 0; i <= n; i++, j += 3) {
            allValues[j] = prefixSums[i];
            allValues[j + 1] = prefixSums[i] - lower;
            allValues[j + 2] = prefixSums[i] - upper;
        }
      
        // Sort and remove duplicates for coordinate compression
        Arrays.sort(allValues);
        int uniqueCount = 0;
        for (int i = 0; i < allValues.length; i++) {
            if (i == 0 || allValues[i] != allValues[i - 1]) {
                allValues[uniqueCount++] = allValues[i];
            }
        }
      
        // Use Binary Indexed Tree to count valid range sums
        BinaryIndexedTree fenwickTree = new BinaryIndexedTree(uniqueCount);
        int result = 0;
      
        for (long currentSum : prefixSums) {
            // Find indices for range [currentSum - upper, currentSum - lower]
            int leftIndex = binarySearch(allValues, uniqueCount, currentSum - upper);
            int rightIndex = binarySearch(allValues, uniqueCount, currentSum - lower);
          
            // Count how many prefix sums fall in the valid range
            result += fenwickTree.query(rightIndex) - fenwickTree.query(leftIndex - 1);
          
            // Add current prefix sum to the tree
            fenwickTree.update(binarySearch(allValues, uniqueCount, currentSum), 1);
        }
      
        return result;
    }

    /**
     * Binary search to find the 1-based index of target in sorted array
     * @param nums the sorted array
     * @param length the effective length of the array
     * @param target the target value to search for
     * @return the 1-based index of the target (or where it would be inserted)
     */
    private int binarySearch(long[] nums, int length, long target) {
        int left = 0;
        int right = length;
      
        while (left < right) {
            int mid = (left + right) >> 1;
            if (nums[mid] >= target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
      
        // Return 1-based index for Binary Indexed Tree
        return left + 1;
    }
}
