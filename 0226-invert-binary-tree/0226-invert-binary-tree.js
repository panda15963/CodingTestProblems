/**
 * Definition for a binary tree node.
 */
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {
    // 트리가 비어있는 경우
    if (root === null) {
        return null;
    }

    // 왼쪽과 오른쪽 자식 노드 교환
    const temp = root.left;

    root.left = invertTree(root.right);
    root.right = invertTree(temp);

    return root;
}