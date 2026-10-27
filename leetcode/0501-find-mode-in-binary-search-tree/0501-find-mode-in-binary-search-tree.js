var findMode = function(root) {
    let previousNode = null;
    let currentCount = 0;
    let maxCount = 0;
    const modes = [];

    const inorderTraversal = (node) => {
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
            modes.length = 0;
            modes.push(node.val);
            maxCount = currentCount;
        } else if (currentCount === maxCount) {
            modes.push(node.val);
        }

        previousNode = node;

        inorderTraversal(node.right);
    };

    inorderTraversal(root);

    return modes;
};