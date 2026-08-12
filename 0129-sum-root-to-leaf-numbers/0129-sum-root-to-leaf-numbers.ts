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
 * Calculates the sum of all root-to-leaf path numbers in a binary tree.
 * Each path from root to leaf represents a number formed by concatenating node values.
 * 
 * @param root - The root node of the binary tree
 * @returns The sum of all root-to-leaf path numbers
 */
function sumNumbers(root: TreeNode | null): number {
    /**
     * Depth-first search helper function to traverse the tree and calculate path sums.
     * 
     * @param node - Current node being processed
     * @param currentPathNumber - The number formed by the path from root to current node
     * @returns Sum of all path numbers in the subtree rooted at current node
     */
    function depthFirstSearch(node: TreeNode | null, currentPathNumber: number): number {
        // Base case: if node is null, return 0
        if (!node) {
            return 0;
        }
      
        // Update the current path number by appending the current node's value
        currentPathNumber = currentPathNumber * 10 + node.val;
      
        // If current node is a leaf node, return the path number
        if (!node.left && !node.right) {
            return currentPathNumber;
        }
      
        // Recursively calculate sum for left and right subtrees
        const leftSum: number = depthFirstSearch(node.left, currentPathNumber);
        const rightSum: number = depthFirstSearch(node.right, currentPathNumber);
      
        return leftSum + rightSum;
    }
  
    // Start DFS from root with initial path number as 0
    return depthFirstSearch(root, 0);
}