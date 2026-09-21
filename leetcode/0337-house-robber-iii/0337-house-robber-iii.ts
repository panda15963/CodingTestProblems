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
 * House Robber III - Rob houses arranged in a binary tree without robbing adjacent nodes
 * @param root - Root node of the binary tree
 * @returns Maximum amount that can be robbed
 */
function rob(root: TreeNode | null): number {
    /**
     * DFS helper function that returns two values for each node:
     * [0] - Maximum amount if current node is robbed
     * [1] - Maximum amount if current node is not robbed
     */
    const dfs = (node: TreeNode | null): [number, number] => {
        // Base case: empty node contributes nothing
        if (!node) {
            return [0, 0];
        }
      
        // Recursively process left and right subtrees
        const [leftRobbed, leftNotRobbed] = dfs(node.left);
        const [rightRobbed, rightNotRobbed] = dfs(node.right);
      
        // If we rob current node, we cannot rob its children
        const robCurrent = node.val + leftNotRobbed + rightNotRobbed;
      
        // If we don't rob current node, we can choose to rob or not rob its children
        const skipCurrent = Math.max(leftRobbed, leftNotRobbed) + Math.max(rightRobbed, rightNotRobbed);
      
        return [robCurrent, skipCurrent];
    };
  
    // Return the maximum of robbing or not robbing the root
    const [robRoot, skipRoot] = dfs(root);
    return Math.max(robRoot, skipRoot);
}
