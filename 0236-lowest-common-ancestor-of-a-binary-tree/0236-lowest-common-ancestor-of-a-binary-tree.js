/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
    // 노드가 없거나 p 또는 q를 찾은 경우
    if (root === null || root === p || root === q) {
        return root;
    }

    // 왼쪽 서브트리 탐색
    const left = lowestCommonAncestor(root.left, p, q);

    // 오른쪽 서브트리 탐색
    const right = lowestCommonAncestor(root.right, p, q);

    // 왼쪽에서 찾지 못한 경우
    if (left === null) {
        return right;
    }

    // 오른쪽에서 찾지 못한 경우
    if (right === null) {
        return left;
    }

    // 양쪽에서 각각 p 또는 q를 찾은 경우
    return root;
}