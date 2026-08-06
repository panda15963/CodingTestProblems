function flatten(root: TreeNode | null): void {
    let curr: TreeNode | null = root;

    while (curr !== null) {
        if (curr.left !== null) {
            // Find the rightmost node of the left subtree
            let leftRightMost: TreeNode = curr.left;

            while (leftRightMost.right !== null) {
                leftRightMost = leftRightMost.right;
            }

            // Connect the original right subtree
            leftRightMost.right = curr.right;

            // Move the left subtree to the right
            curr.right = curr.left;
            curr.left = null;
        }

        // Move to the next node
        curr = curr.right;
    }
}