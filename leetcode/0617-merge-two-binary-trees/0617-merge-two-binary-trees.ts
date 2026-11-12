function mergeTrees(t1: TreeNode | null, t2: TreeNode | null): TreeNode | null {

    if (t1 === null && t2 === null) {
        return null;
    } else if (t1 === null) {
        return t2;
    } else if (t2 === null) {
        return t1;
    } else {
        // 새로운 병합 노드 생성
        const tree = new TreeNode(t1.val + t2.val);

        // DFS - Preorder Traversal
        tree.left = mergeTrees(t1.left, t2.left);
        tree.right = mergeTrees(t1.right, t2.right);

        return tree;
    }
}