function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) {
        return null;
    }

    const rootVal: number = preorder[0];
    const idx: number = inorder.indexOf(rootVal);

    const leftSize: number = idx;
    const rightSize: number = inorder.length - leftSize - 1;

    let left: TreeNode | null = null;
    let right: TreeNode | null = null;

    if (leftSize > 0) {
        left = buildTree(
            preorder.slice(1, 1 + leftSize),
            inorder.slice(0, leftSize)
        );
    }

    if (rightSize > 0) {
        right = buildTree(
            preorder.slice(1 + leftSize),
            inorder.slice(leftSize + 1)
        );
    }

    return new TreeNode(rootVal, left, right);
}