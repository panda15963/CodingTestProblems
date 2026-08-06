function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const result: number[][] = [];

    const dfs = (
        node: TreeNode | null,
        sum: number,
        path: number[]
    ): void => {
        if (node === null) {
            return;
        }

        path.push(node.val);
        sum += node.val;

        // Leaf node
        if (node.left === null && node.right === null) {
            if (sum === targetSum) {
                result.push([...path]);
            }
        }

        if (node.left !== null) {
            dfs(node.left, sum, path);
        }

        if (node.right !== null) {
            dfs(node.right, sum, path);
        }

        // Backtracking
        path.pop();
    };

    dfs(root, 0, []);

    return result;
}