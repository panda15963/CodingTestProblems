/**
 * Binary Indexed Tree (Fenwick Tree) implementation for efficient range sum queries
 * and point updates. Uses 1-based indexing internally.
 */
class BinaryIndexedTree {
    private int size;
    private int[] tree;

    /**
     * Initializes the Binary Indexed Tree with given size
     * @param size the size of the array to be represented
     */
    public BinaryIndexedTree(int size) {
        this.size = size;
        // Use 1-based indexing, so array size is size + 1
        this.tree = new int[size + 1];
    }

    /**
     * Updates the value at position index by adding delta
     * @param index the position to update (1-based)
     * @param delta the value to add
     */
    public void update(int index, int delta) {
        // Propagate the update up the tree
        while (index <= size) {
            tree[index] += delta;
            // Move to next node that this index affects
            // index & -index gives the lowest set bit
            index += index & -index;
        }
    }

    /**
     * Queries the prefix sum from index 1 to index (inclusive)
     * @param index the end position of the range (1-based)
     * @return the sum of elements from 1 to index
     */
    public int query(int index) {
        int sum = 0;
        // Traverse ancestors to calculate prefix sum
        while (index > 0) {
            sum += tree[index];
            // Move to parent node by removing the lowest set bit
            index -= index & -index;
        }
        return sum;
    }
}

/**
 * NumArray class that supports range sum queries and point updates
 * using a Binary Indexed Tree for O(log n) operations
 */
class NumArray {
    private BinaryIndexedTree binaryIndexedTree;

    /**
     * Initializes the NumArray with the given array
     * @param nums the initial array of numbers
     */
    public NumArray(int[] nums) {
        int length = nums.length;
        binaryIndexedTree = new BinaryIndexedTree(length);
      
        // Build the Binary Indexed Tree with initial values
        for (int i = 0; i < length; i++) {
            // Convert to 1-based indexing for the tree
            binaryIndexedTree.update(i + 1, nums[i]);
        }
    }

    /**
     * Updates the value at the given index to a new value
     * @param index the position to update (0-based)
     * @param val the new value to set
     */
    public void update(int index, int val) {
        // Get the current value at this index
        int currentValue = sumRange(index, index);
        // Update by the difference between new and old value
        // Convert to 1-based indexing for the tree
        binaryIndexedTree.update(index + 1, val - currentValue);
    }

    /**
     * Returns the sum of elements from left to right (inclusive)
     * @param left the start index of the range (0-based)
     * @param right the end index of the range (0-based)
     * @return the sum of elements in the range [left, right]
     */
    public int sumRange(int left, int right) {
        // Sum[left, right] = Sum[0, right] - Sum[0, left-1]
        // Convert to 1-based indexing for the tree
        return binaryIndexedTree.query(right + 1) - binaryIndexedTree.query(left);
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray obj = new NumArray(nums);
 * obj.update(index, val);
 * int param_2 = obj.sumRange(left, right);
 */
