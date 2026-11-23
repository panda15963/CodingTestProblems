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
    // Instance variables to store the value to insert and target depth
    private int valueToInsert;
    private int targetDepth;

    /**
     * Adds a row of nodes with the given value at the specified depth in the binary tree.
     * 
     * @param root The root of the binary tree
     * @param val The value to be inserted in the new row
     * @param depth The depth at which to insert the new row (1-indexed)
     * @return The root of the modified tree
     */
    public TreeNode addOneRow(TreeNode root, int val, int depth) {
        // Special case: if depth is 1, create a new root with the original tree as left child
        if (depth == 1) {
            return new TreeNode(val, root, null);
        }
      
        // Store parameters as instance variables for use in DFS
        this.valueToInsert = val;
        this.targetDepth = depth;
      
        // Perform depth-first search to insert the new row
        performDFS(root, 1);
      
        return root;
    }

    /**
     * Performs depth-first search to find nodes at the parent level of the target depth
     * and inserts new nodes between parents and their children.
     * 
     * @param currentNode The current node being processed
     * @param currentDepth The current depth in the tree (1-indexed)
     */
    private void performDFS(TreeNode currentNode, int currentDepth) {
        // Base case: if current node is null, return
        if (currentNode == null) {
            return;
        }
      
        // If we've reached the parent level of the target depth
        if (currentDepth == targetDepth - 1) {
            // Create new left node with current left child as its left child
            TreeNode newLeftNode = new TreeNode(valueToInsert, currentNode.left, null);
          
            // Create new right node with current right child as its right child
            TreeNode newRightNode = new TreeNode(valueToInsert, null, currentNode.right);
          
            // Update current node's children to point to the new nodes
            currentNode.left = newLeftNode;
            currentNode.right = newRightNode;
          
            // No need to continue deeper in the tree
            return;
        }
      
        // Recursively process left and right subtrees
        performDFS(currentNode.left, currentDepth + 1);
        performDFS(currentNode.right, currentDepth + 1);
    }
}
