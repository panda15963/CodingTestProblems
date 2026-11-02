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
    // Constants for representing infinity values
    private static final int INFINITY = 1 << 30;  // Large positive value (2^30)
    private static final int NEGATIVE_INFINITY = -INFINITY;  // Large negative value
  
    // Instance variables to track the minimum difference and previous node value
    private int minimumDifference;  // Stores the minimum absolute difference found
    private int previousValue;      // Stores the value of the previously visited node in inorder traversal
  
    /**
     * Finds the minimum absolute difference between values of any two nodes in a BST.
     * Utilizes the property that inorder traversal of BST yields sorted values.
     * 
     * @param root The root node of the binary search tree
     * @return The minimum absolute difference between any two nodes
     */
    public int getMinimumDifference(TreeNode root) {
        // Initialize variables before traversal
        minimumDifference = INFINITY;
        previousValue = NEGATIVE_INFINITY;
      
        // Perform inorder traversal to find minimum difference
        inorderTraversal(root);
      
        return minimumDifference;
    }
  
    /**
     * Performs inorder traversal of the BST and updates minimum difference.
     * Inorder traversal visits nodes in ascending order for BST.
     * 
     * @param node The current node being processed
     */
    private void inorderTraversal(TreeNode node) {
        // Base case: if node is null, return
        if (node == null) {
            return;
        }
      
        // Traverse left subtree first (smaller values in BST)
        inorderTraversal(node.left);
      
        // Process current node
        // Calculate difference with previous node and update minimum if needed
        minimumDifference = Math.min(minimumDifference, node.val - previousValue);
      
        // Update previous value for next comparison
        previousValue = node.val;
      
        // Traverse right subtree (larger values in BST)
        inorderTraversal(node.right);
    }
}
