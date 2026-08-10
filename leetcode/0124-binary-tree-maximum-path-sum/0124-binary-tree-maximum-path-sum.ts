function maxPathSum(root: TreeNode | null): number {
    let max: number = -Infinity;

    const maxPath = (root: TreeNode | null): number => {
        if (root === null) {
            return 0;
        }

        const value: number = root.val;

        const leftSum: number = Math.max(
            maxPath(root.left),
            0
        );

        const rightSum: number = Math.max(
            maxPath(root.right),
            0
        );

        // 현재 노드를 기준으로 하는 최대 경로
        max = Math.max(
            max,
            leftSum + rightSum + value
        );

        // 부모 노드에게 전달할 수 있는 최대 경로
        return Math.max(leftSum, rightSum) + value;
    };

    maxPath(root);

    return max;
}