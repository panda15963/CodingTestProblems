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
     * House Robber III - Maximum money that can be robbed from binary tree houses
     * where directly connected houses cannot be robbed together
     * 
     * @param root The root of the binary tree
     * @return Maximum amount of money that can be robbed
     */
    public int rob(TreeNode root) {
        // Get the maximum values for both scenarios (rob root vs don't rob root)
        int[] result = dfs(root);
      
        // Return the maximum between robbing root (result[0]) and not robbing root (result[1])
        return Math.max(result[0], result[1]);
    }
  
    /**
     * DFS helper method that returns optimal values for current node
     * 
     * @param root Current node being processed
     * @return Array where [0] = max money if current node is robbed,
     *                     [1] = max money if current node is not robbed
     */
    private int[] dfs(TreeNode root) {
        // Base case: null node contributes 0 to both scenarios
        if (root == null) {
            return new int[2];
        }
      
        // Recursively calculate optimal values for left and right subtrees
        int[] leftSubtree = dfs(root.left);
        int[] rightSubtree = dfs(root.right);
      
        // Calculate optimal values for current node
        // robCurrent: If we rob current node, we cannot rob its children
        int robCurrent = root.val + leftSubtree[1] + rightSubtree[1];
      
        // skipCurrent: If we skip current node, we can choose the max from each child
        int skipCurrent = Math.max(leftSubtree[0], leftSubtree[1]) + 
                         Math.max(rightSubtree[0], rightSubtree[1]);
      
        return new int[] {robCurrent, skipCurrent};
    }
}
