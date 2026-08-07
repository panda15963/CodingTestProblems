/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 *     this.next = (next === undefined ? null : next);
 * }
 */

/**
 * @param {Node|null} root
 * @return {Node|null}
 */
var connect = function (root) {
    if (root === null || root.left === null) {
        return root;
    }

    const left = root.left;
    const right = root.right;
    const next = root.next;

    // Connect left child to right child
    left.next = right;

    // Connect right child to the next subtree's left child
    if (next !== null) {
        right.next = next.left;
    }

    connect(left);
    connect(right);

    return root;
};