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
 * Finds the minimum absolute difference between values of any two nodes in a BST
 * @param root - The root node of the binary search tree
 * @returns The minimum absolute difference between any two node values
 */
function getMinimumDifference(root: TreeNode | null): number {
    // Initialize minimum difference as infinity and previous node value as negative infinity
    let minimumDifference: number = Infinity;
    let previousValue: number = -Infinity;
  
    /**
     * Performs in-order traversal of the BST to visit nodes in ascending order
     * @param node - Current node being processed
     */
    const inOrderTraversal = (node: TreeNode | null): void => {
        // Base case: if node is null, return
        if (!node) {
            return;
        }
      
        // Traverse left subtree first (smaller values in BST)
        inOrderTraversal(node.left);
      
        // Process current node: update minimum difference with current and previous values
        minimumDifference = Math.min(minimumDifference, node.val - previousValue);
      
        // Update previous value for next comparison
        previousValue = node.val;
      
        // Traverse right subtree (larger values in BST)
        inOrderTraversal(node.right);
    };
  
    // Start the in-order traversal from root
    inOrderTraversal(root);
  
    // Return the minimum difference found
    return minimumDifference;
}
