/**
 * Do not return anything, modify root in-place instead.
 */
function recoverTree(root: TreeNode | null): void {
    const nodes: TreeNode[] = [];
    const nodeValues: number[] = [];

    const inorderTraversal = (node: TreeNode | null): void => {
        if (node === null) {
            return;
        }

        inorderTraversal(node.left);

        nodes.push(node);
        nodeValues.push(node.val);

        inorderTraversal(node.right);
    };

    inorderTraversal(root);

    nodeValues.sort((a, b) => a - b);

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].val = nodeValues[i];
    }
}