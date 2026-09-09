/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
function binaryTreePaths(root) {
    const ans = [];
    const path = [];

    function dfs(node) {
        if (!node) {
            return;
        }

        path.push(node.val);

        // 리프 노드인 경우 경로 저장
        if (!node.left && !node.right) {
            ans.push(path.join("->"));
        } else {
            dfs(node.left);
            dfs(node.right);
        }

        // 현재 노드를 경로에서 제거
        path.pop();
    }

    dfs(root);

    return ans;
}