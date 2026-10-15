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
     * Deletes a node with the specified key from the BST.
     * @param root The root of the binary search tree
     * @param key The value of the node to be deleted
     * @return The root of the modified tree
     */
    public TreeNode deleteNode(TreeNode root, int key) {
        // Base case: if tree is empty, return null
        if (root == null) {
            return null;
        }
      
        // If key is smaller than root's value, search in left subtree
        if (root.val > key) {
            root.left = deleteNode(root.left, key);
            return root;
        }
      
        // If key is greater than root's value, search in right subtree
        if (root.val < key) {
            root.right = deleteNode(root.right, key);
            return root;
        }
      
        // Node to be deleted is found (root.val == key)
      
        // Case 1: Node has no left child - return right child
        if (root.left == null) {
            return root.right;
        }
      
        // Case 2: Node has no right child - return left child
        if (root.right == null) {
            return root.left;
        }
      
        // Case 3: Node has both children
        // Find the leftmost node in the right subtree (inorder successor)
        TreeNode successorNode = root.right;
        while (successorNode.left != null) {
            successorNode = successorNode.left;
        }
      
        // Attach the left subtree of deleted node to the successor's left
        successorNode.left = root.left;
      
        // Replace the deleted node with its right subtree
        root = root.right;
      
        return root;
    }
}
