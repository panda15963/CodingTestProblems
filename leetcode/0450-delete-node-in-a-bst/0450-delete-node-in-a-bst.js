/**
 * Deletes a node with the specified key from a Binary Search Tree.
 *
 * @param {TreeNode | null} root
 * @param {number} key
 * @return {TreeNode | null}
 */
var deleteNode = function(root, key) {
    // Base case: empty tree
    if (root === null) {
        return null;
    }

    // Search for the node to delete
    if (root.val > key) {
        root.left = deleteNode(root.left, key);
    } else if (root.val < key) {
        root.right = deleteNode(root.right, key);
    } else {
        // Case 1: No children
        if (root.left === null && root.right === null) {
            return null;
        }

        // Case 2: Only one child
        if (root.left === null) {
            return root.right;
        }

        if (root.right === null) {
            return root.left;
        }

        // Case 3: Two children
        // Find the minimum node in the right subtree
        let successor = root.right;

        while (successor.left !== null) {
            successor = successor.left;
        }

        // Replace the current value with the successor's value
        root.val = successor.val;

        // Delete the inorder successor
        root.right = deleteNode(root.right, successor.val);
    }

    return root;
};