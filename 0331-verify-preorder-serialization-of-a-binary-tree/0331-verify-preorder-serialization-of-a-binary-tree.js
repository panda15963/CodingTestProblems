var isValidSerialization = function(preorder) {
    const nodeStack = [];
    const nodes = preorder.split(',');

    for (const node of nodes) {
        nodeStack.push(node);

        while (
            nodeStack.length >= 3 &&
            nodeStack[nodeStack.length - 1] === '#' &&
            nodeStack[nodeStack.length - 2] === '#' &&
            nodeStack[nodeStack.length - 3] !== '#'
        ) {
            nodeStack.splice(nodeStack.length - 3, 3, '#');
        }
    }

    return nodeStack.length === 1 && nodeStack[0] === '#';
};