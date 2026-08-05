/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 */

/**
 * Performs bottom-up level order traversal of a binary tree.
 *
 * @param {TreeNode|null} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
    // Result array
    const result = [];

    // Empty tree
    if (!root) {
        return result;
    }

    // BFS queue
    const queue = [root];

    while (queue.length > 0) {
        const currentLevel = [];
        const nextLevelQueue = [];

        // Traverse current level
        for (const node of queue) {
            currentLevel.push(node.val);

            if (node.left) {
                nextLevelQueue.push(node.left);
            }

            if (node.right) {
                nextLevelQueue.push(node.right);
            }
        }

        result.push(currentLevel);

        // Move to next level
        queue.splice(0, queue.length, ...nextLevelQueue);
    }

    // Bottom-up order
    return result.reverse();
};