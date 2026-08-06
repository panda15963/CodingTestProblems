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
 * Determines if the tree has a root-to-leaf path where the sum of node values equals targetSum
 * @param root - The root node of the binary tree
 * @param targetSum - The target sum to find in a root-to-leaf path
 * @returns true if such a path exists, false otherwise
 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    // Base case: empty tree has no valid path
    if (root === null) {
        return false;
    }
  
    // Destructure current node properties for cleaner access
    const { val: currentValue, left: leftChild, right: rightChild } = root;
  
    // Check if current node is a leaf node
    const isLeafNode: boolean = leftChild === null && rightChild === null;
  
    // If it's a leaf, check if the remaining sum equals the current node's value
    if (isLeafNode) {
        return targetSum - currentValue === 0;
    }
  
    // Recursively check left and right subtrees with updated remaining sum
    // Return true if either subtree contains a valid path
    const remainingSum: number = targetSum - currentValue;
    return hasPathSum(leftChild, remainingSum) || hasPathSum(rightChild, remainingSum);
}
