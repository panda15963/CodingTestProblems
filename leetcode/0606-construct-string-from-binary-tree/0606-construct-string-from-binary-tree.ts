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
 * Converts a binary tree to a string representation with parentheses.
 * The string representation follows these rules:
 * - Root value is always present
 * - Left subtree is wrapped in parentheses (even if empty, unless right subtree is also empty)
 * - Right subtree is wrapped in parentheses (only if present)
 * 
 * @param root - The root node of the binary tree
 * @returns String representation of the binary tree
 */
function tree2str(root: TreeNode | null): string {
    // Base case: empty tree returns empty string
    if (root === null) {
        return '';
    }
  
    // Leaf node: return just the value without parentheses
    if (root.left === null && root.right === null) {
        return String(root.val);
    }
  
    // Build the string representation
    let result: string = String(root.val);
  
    // Add left subtree (always include parentheses if not a leaf)
    const leftSubtree: string = root.left ? tree2str(root.left) : '';
    result += `(${leftSubtree})`;
  
    // Add right subtree only if it exists (with parentheses)
    if (root.right !== null) {
        const rightSubtree: string = tree2str(root.right);
        result += `(${rightSubtree})`;
    }
  
    return result;
}
