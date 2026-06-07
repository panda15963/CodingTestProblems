function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

var createBinaryTree = function(descriptions) {
    const nodeMap = new Map();
    const childrenSet = new Set();

    for (const [parentValue, childValue, isLeft] of descriptions) {
        if (!nodeMap.has(parentValue)) {
            nodeMap.set(parentValue, new TreeNode(parentValue));
        }

        if (!nodeMap.has(childValue)) {
            nodeMap.set(childValue, new TreeNode(childValue));
        }

        const parentNode = nodeMap.get(parentValue);
        const childNode = nodeMap.get(childValue);

        if (isLeft === 1) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }

        childrenSet.add(childValue);
    }

    for (const [value, node] of nodeMap.entries()) {
        if (!childrenSet.has(value)) {
            return node;
        }
    }

    return null;
};