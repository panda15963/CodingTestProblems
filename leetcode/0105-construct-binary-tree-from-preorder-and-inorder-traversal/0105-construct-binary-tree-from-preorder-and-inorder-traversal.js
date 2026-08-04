/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    if (preorder.length === 0) {
        return null;
    }

    const rootVal = preorder[0];
    const idx = inorder.indexOf(rootVal);

    const leftSize = idx;
    const rightSize = inorder.length - leftSize - 1;

    let left = null;
    let right = null;

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
};