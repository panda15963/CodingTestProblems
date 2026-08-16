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
 * Performs postorder traversal of a binary tree
 * 순서: left -> right -> root
 */
function postorderTraversal(root) {
    const result = [];

    const performDFS = (node) => {
        // Base case
        if (!node) {
            return;
        }

        // 왼쪽 서브트리
        performDFS(node.left);

        // 오른쪽 서브트리
        performDFS(node.right);

        // 현재 노드
        result.push(node.val);
    };

    performDFS(root);

    return result;
}