/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 */

/**
 * @param {TreeNode|null} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
    const result = [];

    function dfs(node, sum, path) {
        if (node === null) {
            return;
        }

        path.push(node.val);
        sum += node.val;

        // Leaf node
        if (node.left === null && node.right === null) {
            if (sum === targetSum) {
                result.push([...path]);
            }
        }

        if (node.left !== null) {
            dfs(node.left, sum, path);
        }

        if (node.right !== null) {
            dfs(node.right, sum, path);
        }

        // Backtracking
        path.pop();
    }

    dfs(root, 0, []);

    return result;
};