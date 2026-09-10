/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val, left, right) {
 *         this.val = (val === undefined ? 0 : val);
 *         this.left = (left === undefined ? null : left);
 *         this.right = (right === undefined ? null : right);
 *     }
 * }
 */

/**
 * Counts the number of nodes whose value equals
 * the floor of the average of values in its subtree.
 *
 * @param {TreeNode | null} root
 * @returns {number}
 */
function averageOfSubtree(root) {
    let resultCount = 0;

    /**
     * @param {TreeNode | null} node
     * @returns {[number, number]} [sum, count]
     */
    function calculateSubtreeInfo(node) {
        // Empty node
        if (!node) {
            return [0, 0];
        }

        // Left subtree
        const [leftSum, leftCount] = calculateSubtreeInfo(node.left);

        // Right subtree
        const [rightSum, rightCount] = calculateSubtreeInfo(node.right);

        // Current subtree sum
        const totalSum = leftSum + rightSum + node.val;

        // Current subtree node count
        const totalCount = leftCount + rightCount + 1;

        // Check floor(average) === node.val
        if (Math.floor(totalSum / totalCount) === node.val) {
            resultCount++;
        }

        return [totalSum, totalCount];
    }

    calculateSubtreeInfo(root);

    return resultCount;
}