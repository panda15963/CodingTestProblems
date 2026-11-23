/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * Adds a row of nodes with the given value at the specified depth in the binary tree.
 * 
 * @param root - The root node of the binary tree
 * @param val - The value to be assigned to the new nodes
 * @param depth - The depth at which to insert the new row (1-indexed)
 * @returns The modified tree with the new row added
 */
function addOneRow(root: TreeNode | null, val: number, depth: number): TreeNode | null {
    // Special case: if depth is 1, create a new root with the original tree as left child
    if (depth === 1) {
        return new TreeNode(val, root, null);
    }
  
    /**
     * Performs depth-first search to find the target depth and insert new nodes.
     * 
     * @param node - The current node being processed
     * @param currentDepth - The current depth in the tree (1-indexed)
     */
    function dfs(node: TreeNode | null, currentDepth: number): void {
        // Base case: if node is null, nothing to process
        if (!node) {
            return;
        }
      
        // When we reach the parent level of the target depth, insert new nodes
        if (currentDepth === depth - 1) {
            // Create new left node with original left subtree as its left child
            node.left = new TreeNode(val, node.left, null);
            // Create new right node with original right subtree as its right child
            node.right = new TreeNode(val, null, node.right);
            return;
        }
      
        // Recursively traverse left and right subtrees
        dfs(node.left, currentDepth + 1);
        dfs(node.right, currentDepth + 1);
    }
  
    // Start DFS from root at depth 1
    dfs(root, 1);
  
    return root;
}
