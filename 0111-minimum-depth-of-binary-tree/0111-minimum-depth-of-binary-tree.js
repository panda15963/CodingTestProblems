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
 * @return {number}
 */
var minDepth = function (root) {
    if (root === null) {
        return 0;
    }

    const left = minDepth(root.left);
    const right = minDepth(root.right);

    if (left === 0 && right === 0) {
        return 1;
    }

    if (left !== 0 && right !== 0) {
        return Math.min(left, right) + 1;
    }

    return Math.max(left, right) + 1;
};