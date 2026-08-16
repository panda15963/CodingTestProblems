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
 * Performs postorder traversal of a binary tree
 * @param root - The root node of the binary tree
 * @returns An array containing node values in postorder sequence (left, right, root)
 */
function postorderTraversal(root: TreeNode | null): number[] {
    // Array to store the traversal result
    const result: number[] = [];
  
    /**
     * Helper function to perform depth-first search in postorder
     * @param node - The current node being processed
     */
    const performDFS = (node: TreeNode | null): void => {
        // Base case: if node is null, return
        if (!node) {
            return;
        }
      
        // Traverse left subtree first
        performDFS(node.left);
      
        // Then traverse right subtree
        performDFS(node.right);
      
        // Finally, process the current node
        result.push(node.val);
    };
  
    // Start the traversal from the root
    performDFS(root);
  
    return result;
}