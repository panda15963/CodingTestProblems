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
    // List to store the result of postorder traversal
    private List<Integer> result = new ArrayList<>();

    /**
     * Performs postorder traversal of a binary tree
     * @param root The root node of the binary tree
     * @return List of node values in postorder sequence (left, right, root)
     */
    public List<Integer> postorderTraversal(TreeNode root) {
        performPostorderDFS(root);
        return result;
    }

    /**
     * Helper method to recursively traverse the tree in postorder
     * @param node The current node being processed
     */
    private void performPostorderDFS(TreeNode node) {
        // Base case: if node is null, return
        if (node == null) {
            return;
        }
      
        // Traverse left subtree first
        performPostorderDFS(node.left);
      
        // Traverse right subtree second
        performPostorderDFS(node.right);
      
        // Process current node last (postorder)
        result.add(node.val);
    }
}