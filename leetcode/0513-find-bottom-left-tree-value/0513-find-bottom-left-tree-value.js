var findBottomLeftValue = function(root) {
    let mx = 0;
    let ans = 0;

    function dfs(node, curr) {
        if (!node) {
            return;
        }

        dfs(node.left, curr + 1);
        dfs(node.right, curr + 1);

        if (mx < curr) {
            mx = curr;
            ans = node.val;
        }
    }

    dfs(root, 1);

    return ans;
};