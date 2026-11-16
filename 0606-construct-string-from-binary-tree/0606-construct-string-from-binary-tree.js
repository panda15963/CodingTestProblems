/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 */

/**
 * Converts a binary tree to a string representation with parentheses.
 *
 * @param {TreeNode | null} root - The root node of the binary tree
 * @returns {string} String representation of the binary tree
 */
function tree2str(root) {
    // 트리가 비어 있는 경우 빈 문자열 반환
    if (root === null) {
        return '';
    }

    // 리프 노드인 경우 값만 반환
    if (root.left === null && root.right === null) {
        return String(root.val);
    }

    // 현재 노드의 값으로 문자열 초기화
    let result = String(root.val);

    // 왼쪽 서브트리 추가
    const leftSubtree = root.left ? tree2str(root.left) : '';
    result += `(${leftSubtree})`;

    // 오른쪽 서브트리가 존재하는 경우 추가
    if (root.right !== null) {
        const rightSubtree = tree2str(root.right);
        result += `(${rightSubtree})`;
    }

    return result;
}