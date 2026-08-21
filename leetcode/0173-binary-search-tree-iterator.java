/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

/**
 * Binary Search Tree Iterator implementation.
 * Performs in-order traversal of BST and stores values in a list.
 * Provides iterator functionality to traverse through BST values in ascending order.
 */
class BSTIterator {
    // Current index pointer for iteration through the values list
    private int currentIndex;
  
    // List to store all BST values in sorted order (in-order traversal result)
    private List<Integer> values;

    /**
     * Constructor initializes the iterator with the root of BST.
     * Performs complete in-order traversal and stores all values.
     * Time Complexity: O(n) where n is the number of nodes
     * Space Complexity: O(n) for storing all node values
     * 
     * @param root The root node of the binary search tree
     */
    public BSTIterator(TreeNode root) {
        this.currentIndex = 0;
        this.values = new ArrayList<>();
        performInorderTraversal(root);
    }

    /**
     * Returns the next smallest element in the BST.
     * Time Complexity: O(1)
     * 
     * @return The next smallest integer value in the BST
     */
    public int next() {
        // Return current value and increment the index for next call
        return values.get(currentIndex++);
    }

    /**
     * Checks if there are more elements to iterate.
     * Time Complexity: O(1)
     * 
     * @return true if there are more elements, false otherwise
     */
    public boolean hasNext() {
        // Check if current index is within the bounds of values list
        return currentIndex < values.size();
    }

    /**
     * Helper method to perform in-order traversal of the BST.
     * Recursively traverses left subtree, processes current node, then right subtree.
     * This ensures values are added to the list in ascending order.
     * 
     * @param node The current node being processed in the traversal
     */
    private void performInorderTraversal(TreeNode node) {
        // Base case: if node is null, return
        if (node == null) {
            return;
        }
      
        // Traverse left subtree first (smaller values)
        performInorderTraversal(node.left);
      
        // Process current node - add its value to the list
        values.add(node.val);
      
        // Traverse right subtree (larger values)
        performInorderTraversal(node.right);
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator obj = new BSTIterator(root);
 * int param_1 = obj.next();
 * boolean param_2 = obj.hasNext();
 */
