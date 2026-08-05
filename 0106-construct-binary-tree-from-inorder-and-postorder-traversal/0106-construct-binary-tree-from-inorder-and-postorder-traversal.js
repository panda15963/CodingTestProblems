/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 */

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
    let postorderIndex = postorder.length - 1;

    function makeSubTree(inorderStart, inorderEnd) {
        if (inorderStart > inorderEnd) {
            return null;
        }

        const node = new TreeNode(postorder[postorderIndex]);

        for (let i = inorderStart; i <= inorderEnd; i++) {
            if (postorder[postorderIndex] === inorder[i]) {
                postorderIndex--;

                // Build right subtree first
                node.right = makeSubTree(i + 1, inorderEnd);

                // Build left subtree
                node.left = makeSubTree(inorderStart, i - 1);

                break;
            }
        }

        return node;
    }

    return makeSubTree(0, inorder.length - 1);
};