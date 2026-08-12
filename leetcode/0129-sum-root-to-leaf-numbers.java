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
     * Calculates the sum of all root-to-leaf numbers in a binary tree.
     * Each path from root to leaf represents a number formed by concatenating node values.
     * 
     * @param root The root node of the binary tree
     * @return The sum of all root-to-leaf numbers
     */
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    /**
     * Depth-first search helper method to traverse the tree and calculate path sums.
     * 
     * @param node The current node being processed
     * @param currentNumber The number formed by the path from root to current node's parent
     * @return The sum of all root-to-leaf numbers in the subtree rooted at current node
     */
    private int dfs(TreeNode node, int currentNumber) {
        // Base case: if node is null, contribute 0 to the sum
        if (node == null) {
            return 0;
        }
      
        // Update the current number by appending the current node's value
        currentNumber = currentNumber * 10 + node.val;
      
        // If this is a leaf node, return the complete number formed
        if (node.left == null && node.right == null) {
            return currentNumber;
        }
      
        // Recursively calculate sum for left and right subtrees
        return dfs(node.left, currentNumber) + dfs(node.right, currentNumber);
    }
}