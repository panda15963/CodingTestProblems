/**
 * Finds the minimum absolute difference between values of any two nodes in a BST.
 *
 * @param {TreeNode} root - The root node of the binary search tree
 * @return {number} The minimum absolute difference
 */
var getMinimumDifference = function(root) {
    let minimumDifference = Infinity;
    let previousValue = -Infinity;

    /**
     * Performs in-order traversal of the BST.
     *
     * @param {TreeNode} node - Current node
     */
    const inOrderTraversal = (node) => {
        if (!node) {
            return;
        }

        // Traverse left subtree
        inOrderTraversal(node.left);

        // Update minimum difference
        minimumDifference = Math.min(
            minimumDifference,
            node.val - previousValue
        );

        // Update previous value
        previousValue = node.val;

        // Traverse right subtree
        inOrderTraversal(node.right);
    };

    inOrderTraversal(root);

    return minimumDifference;
};