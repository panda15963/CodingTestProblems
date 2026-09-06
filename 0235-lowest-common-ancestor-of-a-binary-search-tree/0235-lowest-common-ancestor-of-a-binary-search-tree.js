/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
    // 노드가 없는 경우
    if (!root || !p || !q) {
        return null;
    }

    // p와 q가 모두 현재 노드의 왼쪽에 있는 경우
    if (Math.max(p.val, q.val) < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }

    // p와 q가 모두 현재 노드의 오른쪽에 있는 경우
    if (Math.min(p.val, q.val) > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }

    // p와 q가 현재 노드를 기준으로 양쪽에 있거나
    // 둘 중 하나가 현재 노드인 경우
    return root;
}