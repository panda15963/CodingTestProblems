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
 * Calculates the sum of all node tilts in a binary tree.
 * The tilt of a node is the absolute difference between the sum of all left subtree node values
 * and the sum of all right subtree node values.
 * 
 * @param root - The root node of the binary tree
 * @returns The sum of all node tilts in the tree
 */
function findTilt(root: TreeNode | null): number {
    // Variable to accumulate the total tilt of all nodes
    let totalTilt: number = 0;
  
    /**
     * Performs depth-first search to calculate subtree sums and update total tilt.
     * 
     * @param node - The current node being processed
     * @returns The sum of all node values in the subtree rooted at the current node
     */
    const calculateSubtreeSum = (node: TreeNode | null): number => {
        // Base case: empty node contributes 0 to the sum
        if (!node) {
            return 0;
        }
      
        // Recursively calculate the sum of left and right subtrees
        const leftSubtreeSum: number = calculateSubtreeSum(node.left);
        const rightSubtreeSum: number = calculateSubtreeSum(node.right);
      
        // Calculate and add the tilt of the current node to the total
        totalTilt += Math.abs(leftSubtreeSum - rightSubtreeSum);
      
        // Return the sum of the entire subtree rooted at the current node
        return leftSubtreeSum + rightSubtreeSum + node.val;
    };
  
    // Start the DFS traversal from the root
    calculateSubtreeSum(root);
  
    return totalTilt;
}
