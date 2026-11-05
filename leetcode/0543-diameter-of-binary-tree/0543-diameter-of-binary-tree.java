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
    // Global variable to track the maximum diameter found
    private int maxDiameter;

    /**
     * Calculates the diameter of a binary tree.
     * The diameter is the length of the longest path between any two nodes,
     * which may or may not pass through the root.
     * 
     * @param root The root node of the binary tree
     * @return The diameter of the binary tree
     */
    public int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        calculateHeight(root);
        return maxDiameter;
    }

    /**
     * Recursively calculates the height of the tree while updating the maximum diameter.
     * For each node, the diameter passing through it equals left height + right height.
     * 
     * @param node The current node being processed
     * @return The height of the subtree rooted at the current node
     */
    private int calculateHeight(TreeNode node) {
        // Base case: null node has height 0
        if (node == null) {
            return 0;
        }
      
        // Recursively calculate the height of left subtree
        int leftHeight = calculateHeight(node.left);
      
        // Recursively calculate the height of right subtree
        int rightHeight = calculateHeight(node.right);
      
        // Update the maximum diameter if the path through current node is longer
        // The diameter through current node = left height + right height
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
      
        // Return the height of current subtree
        // Height = 1 (current node) + maximum height of its subtrees
        return 1 + Math.max(leftHeight, rightHeight);
    }
}
