/**
 * @param {TreeNode|null} root
 * @return {number}
 */
function rob(root) {
    const dfs = (node) => {
        if (!node) {
            return [0, 0];
        }

        const [leftRobbed, leftNotRobbed] = dfs(node.left);
        const [rightRobbed, rightNotRobbed] = dfs(node.right);

        // 현재 노드를 훔치는 경우
        const robCurrent =
            node.val + leftNotRobbed + rightNotRobbed;

        // 현재 노드를 훔치지 않는 경우
        const skipCurrent =
            Math.max(leftRobbed, leftNotRobbed) +
            Math.max(rightRobbed, rightNotRobbed);

        return [robCurrent, skipCurrent];
    };

    const [robRoot, skipRoot] = dfs(root);

    return Math.max(robRoot, skipRoot);
}