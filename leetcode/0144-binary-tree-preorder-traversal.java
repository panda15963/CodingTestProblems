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
    // List to store the result of preorder traversal
    private List<Integer> result = new ArrayList<>();

    /**
     * Performs preorder traversal of a binary tree
     * @param root The root node of the binary tree
     * @return List containing values in preorder sequence (root -> left -> right)
     */
    public List<Integer> preorderTraversal(TreeNode root) {
        performPreorderDFS(root);
        return result;
    }

    /**
     * Helper method to recursively traverse the tree in preorder
     * @param node Current node being processed
     */
    private void performPreorderDFS(TreeNode node) {
        // Base case: if node is null, return
        if (node == null) {
            return;
        }
      
        // Process current node (preorder: root first)
        result.add(node.val);
      
        // Recursively traverse left subtree
        performPreorderDFS(node.left);
      
        // Recursively traverse right subtree
        performPreorderDFS(node.right);
    }
}