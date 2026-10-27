let previousNode: TreeNode | null;
let currentCount: number;
let maxCount: number;
let modes: number[];

function findMode(root: TreeNode | null): number[] {
    previousNode = null;
    currentCount = 0;
    maxCount = 0;
    modes = [];

    inorderTraversal(root);

    return modes;
}

function inorderTraversal(node: TreeNode | null): void {
    if (!node) {
        return;
    }

    inorderTraversal(node.left);

    if (previousNode !== null && previousNode.val === node.val) {
        currentCount++;
    } else {
        currentCount = 1;
    }

    if (currentCount > maxCount) {
        modes = [node.val];
        maxCount = currentCount;
    } else if (currentCount === maxCount) {
        modes.push(node.val);
    }

    previousNode = node;

    inorderTraversal(node.right);
}