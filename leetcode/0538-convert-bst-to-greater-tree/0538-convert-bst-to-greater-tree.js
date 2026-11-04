/**
 * Converts a Binary Search Tree to a Greater Sum Tree.
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function(root) {
    let runningSum = 0;

    /**
     * Reverse in-order traversal (right -> node -> left)
     */
    const traverseAndUpdate = (node) => {
        if (!node) {
            return;
        }

        // Traverse right subtree
        traverseAndUpdate(node.right);

        // Update running sum
        runningSum += node.val;

        // Replace current node value
        node.val = runningSum;

        // Traverse left subtree
        traverseAndUpdate(node.left);
    };

    traverseAndUpdate(root);

    return root;
};