var maxPathSum = function (root) {
    let max = -Infinity;

    function maxPath(root) {
        if (root === null) {
            return 0;
        }

        const value = root.val;

        const leftSum = Math.max(maxPath(root.left), 0);
        const rightSum = Math.max(maxPath(root.right), 0);

        // 현재 노드를 기준으로 왼쪽 + 현재 + 오른쪽 경로
        max = Math.max(
            max,
            leftSum + rightSum + value
        );

        // 부모에게 전달할 수 있는 최대 경로
        return Math.max(leftSum, rightSum) + value;
    }

    maxPath(root);

    return max;
};