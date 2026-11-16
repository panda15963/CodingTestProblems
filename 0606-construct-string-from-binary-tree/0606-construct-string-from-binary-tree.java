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
     * Converts a binary tree to a string representation with parentheses.
     * The string follows preorder traversal where each node's value is followed
     * by its left subtree in parentheses, then its right subtree in parentheses.
     * Empty parentheses are omitted when possible.
     * 
     * @param root The root node of the binary tree
     * @return String representation of the tree
     */
    public String tree2str(TreeNode root) {
        // Base case: empty tree returns empty string
        if (root == null) {
            return "";
        }
      
        // Leaf node: return just the node value without parentheses
        if (root.left == null && root.right == null) {
            return String.valueOf(root.val);
        }
      
        // Node has only left child: include left subtree in parentheses
        // Right empty parentheses can be omitted
        if (root.right == null) {
            return root.val + "(" + tree2str(root.left) + ")";
        }
      
        // Node has both children or only right child: 
        // Must include both left and right subtrees in parentheses
        // (Empty left subtree parentheses cannot be omitted if right exists)
        return root.val + "(" + tree2str(root.left) + ")(" + tree2str(root.right) + ")";
    }
}
