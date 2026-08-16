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
 * Performs preorder traversal of a binary tree
 * @param root - The root node of the binary tree
 * @returns An array containing the values of nodes in preorder sequence
 */
function preorderTraversal(root: TreeNode | null): number[] {
    // Array to store the traversal result
    const result: number[] = [];
  
    /**
     * Helper function to perform depth-first search in preorder
     * @param node - Current node being processed
     */
    const traversePreorder = (node: TreeNode | null): void => {
        // Base case: if node is null, return
        if (!node) {
            return;
        }
      
        // Process current node (root)
        result.push(node.val);
      
        // Recursively traverse left subtree
        traversePreorder(node.left);
      
        // Recursively traverse right subtree
        traversePreorder(node.right);
    };
  
    // Start the traversal from the root
    traversePreorder(root);
  
    return result;
}
