
var addOneRow = function(root, val, depth) {
    // If depth is 1, create a new root
    if (depth === 1) {
        return new TreeNode(val, root, null);
    }

    /**
     * DFS to find the target depth and insert new nodes.
     */
    function dfs(node, currentDepth) {
        // Base case
        if (!node) {
            return;
        }

        // Insert new nodes at the parent level of target depth
        if (currentDepth === depth - 1) {
            // Insert new left node
            node.left = new TreeNode(val, node.left, null);

            // Insert new right node
            node.right = new TreeNode(val, null, node.right);

            return;
        }

        // Traverse left and right subtrees
        dfs(node.left, currentDepth + 1);
        dfs(node.right, currentDepth + 1);
    }

    // Start DFS from root
    dfs(root, 1);

    return root;
};
