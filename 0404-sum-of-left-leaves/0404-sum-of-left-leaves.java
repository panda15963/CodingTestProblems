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
    /**
     * Calculates the sum of all left leaves in a binary tree.
     * A left leaf is a leaf node that is the left child of its parent.
     * 
     * @param root The root of the binary tree
     * @return The sum of all left leaves' values
     */
    public int sumOfLeftLeaves(TreeNode root) {
        // Base case: empty tree has no left leaves
        if (root == null) {
            return 0;
        }
      
        // Initialize sum with the result from the right subtree
        int sum = sumOfLeftLeaves(root.right);
      
        // Check if there's a left child
        if (root.left != null) {
            // Check if the left child is a leaf node
            // A node is a leaf if both its children are null
            if (root.left.left == null && root.left.right == null) {
                // Add the left leaf's value to the sum
                sum += root.left.val;
            } else {
                // If left child is not a leaf, recursively process the left subtree
                sum += sumOfLeftLeaves(root.left);
            }
        }
      
        return sum;
    }
}
