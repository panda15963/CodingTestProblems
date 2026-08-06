function minDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    const left: number = minDepth(root.left);
    const right: number = minDepth(root.right);

    if (left === 0 && right === 0) {
        return 1;
    }

    if (left !== 0 && right !== 0) {
        return Math.min(left, right) + 1;
    }

    return Math.max(left, right) + 1;
}