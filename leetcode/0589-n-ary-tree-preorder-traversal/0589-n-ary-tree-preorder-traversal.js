/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function(root) {
    const res = [];
    const nodeStack = [];

    if (root === null) {
        return res;
    }

    nodeStack.push(root);

    while (nodeStack.length > 0) {
        const curRoot = nodeStack.pop();

        res.push(curRoot.val);

        // 자식 노드를 역순으로 Stack에 삽입
        for (let i = curRoot.children.length - 1; i >= 0; i--) {
            nodeStack.push(curRoot.children[i]);
        }
    }

    return res;
};