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
 * Inverts a binary tree by swapping left and right children recursively
 * @param root - The root node of the binary tree to invert
 * @returns The root of the inverted binary tree
 */
function invertTree(root: TreeNode | null): TreeNode | null {
    // Base case: if the node is null, return null
    if (!root) {
        return root;
    }

    // Recursively invert the left subtree
    const leftSubtree: TreeNode | null = invertTree(root.left);

    // Recursively invert the right subtree
    const rightSubtree: TreeNode | null = invertTree(root.right);

    // Swap the left and right children of the current node
    root.left = rightSubtree;
    root.right = leftSubtree;

    // Return the root node with its children swapped
    return root;
}
