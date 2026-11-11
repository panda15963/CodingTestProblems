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
    // Instance variable to accumulate the total tilt of all nodes
    private int totalTilt;

    /**
     * Finds the sum of all node tilts in the binary tree.
     * The tilt of a node is the absolute difference between 
     * the sum of all left subtree node values and the sum of 
     * all right subtree node values.
     * 
     * @param root The root of the binary tree
     * @return The sum of all node tilts in the tree
     */
    public int findTilt(TreeNode root) {
        totalTilt = 0;
        calculateSubtreeSum(root);
        return totalTilt;
    }

    /**
     * Recursively calculates the sum of all nodes in the subtree
     * while accumulating the tilt for each node.
     * 
     * @param node The current node being processed
     * @return The sum of all node values in the subtree rooted at this node
     */
    private int calculateSubtreeSum(TreeNode node) {
        // Base case: null node contributes 0 to the sum
        if (node == null) {
            return 0;
        }
      
        // Recursively calculate sum of left and right subtrees
        int leftSubtreeSum = calculateSubtreeSum(node.left);
        int rightSubtreeSum = calculateSubtreeSum(node.right);
      
        // Calculate and accumulate the tilt for current node
        int currentNodeTilt = Math.abs(leftSubtreeSum - rightSubtreeSum);
        totalTilt += currentNodeTilt;
      
        // Return the total sum of this subtree (left + right + current node value)
        return leftSubtreeSum + rightSubtreeSum + node.val;
    }
}
