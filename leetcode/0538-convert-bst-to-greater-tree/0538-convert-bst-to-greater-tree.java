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
class Solution {
    // Running sum to accumulate values from larger nodes
    private int runningSum;

    /**
     * Converts a Binary Search Tree to a Greater Sum Tree where each node's value
     * is updated to the sum of all nodes with values greater than or equal to it.
     * 
     * @param root The root of the binary search tree
     * @return The root of the modified tree (same reference)
     */
    public TreeNode convertBST(TreeNode root) {
        performReverseInorderTraversal(root);
        return root;
    }

    /**
     * Performs a reverse inorder traversal (right -> node -> left) to visit nodes
     * in descending order and update each node's value with the running sum.
     * 
     * @param node The current node being processed
     */
    private void performReverseInorderTraversal(TreeNode node) {
        // Base case: if node is null, return
        if (node == null) {
            return;
        }
      
        // Traverse the right subtree first (larger values in BST)
        performReverseInorderTraversal(node.right);
      
        // Update running sum with current node's value
        runningSum += node.val;
      
        // Update current node's value to the running sum
        node.val = runningSum;
      
        // Traverse the left subtree (smaller values in BST)
        performReverseInorderTraversal(node.left);
    }
}
