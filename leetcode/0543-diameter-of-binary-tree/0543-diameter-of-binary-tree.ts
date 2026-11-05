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
 * Calculates the diameter of a binary tree.
 * The diameter is the length of the longest path between any two nodes in the tree.
 * This path may or may not pass through the root.
 * 
 * @param root - The root node of the binary tree
 * @returns The diameter of the binary tree
 */
function diameterOfBinaryTree(root: TreeNode | null): number {
    // Variable to track the maximum diameter found
    let maxDiameter: number = 0;
  
    /**
     * Depth-first search helper function to calculate the height of each subtree
     * while updating the maximum diameter.
     * 
     * @param node - The current node being processed
     * @returns The height of the subtree rooted at the current node
     */
    const calculateHeight = (node: TreeNode | null): number => {
        // Base case: if node is null, height is 0
        if (!node) {
            return 0;
        }
      
        // Recursively calculate the height of left and right subtrees
        const leftHeight: number = calculateHeight(node.left);
        const rightHeight: number = calculateHeight(node.right);
      
        // Update the maximum diameter if the path through current node is longer
        // The diameter through current node = left height + right height
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
      
        // Return the height of current subtree (1 + maximum height of children)
        return 1 + Math.max(leftHeight, rightHeight);
    };
  
    // Start the DFS traversal from the root
    calculateHeight(root);
  
    // Return the maximum diameter found
    return maxDiameter;
}
