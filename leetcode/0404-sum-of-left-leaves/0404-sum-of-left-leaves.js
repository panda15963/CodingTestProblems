var sumOfLeftLeaves = function(root) {
    // Empty tree
    if (!root) {
        return 0;
    }

    // Sum of left leaves in the right subtree
    let sum = sumOfLeftLeaves(root.right);

    // Check if there is a left child
    if (root.left) {
        // Check if the left child is a leaf node
        if (
            root.left.left === null &&
            root.left.right === null
        ) {
            sum += root.left.val;
        } else {
            // Left child is not a leaf
            sum += sumOfLeftLeaves(root.left);
        }
    }

    return sum;
};