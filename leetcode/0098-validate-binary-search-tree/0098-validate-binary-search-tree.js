/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

/**
 * @param {TreeNode|null} root
 * @return {boolean}
 */
function isValidBST(root) {
    let prev = null;

    function dfs(node) {
        if (!node) {
            return true;
        }

        if (!dfs(node.left)) {
            return false;
        }

        if (prev && prev.val >= node.val) {
            return false;
        }

        prev = node;

        return dfs(node.right);
    }

    return dfs(root);
}