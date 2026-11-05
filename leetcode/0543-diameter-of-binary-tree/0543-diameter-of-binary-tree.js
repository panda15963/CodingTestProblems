var diameterOfBinaryTree = function(root) {
    let maxDiameter = 0;

    const calculateHeight = function(node) {
        // 현재 노드가 null이면 높이는 0
        if (!node) {
            return 0;
        }

        // 왼쪽, 오른쪽 서브트리의 높이 계산
        const leftHeight = calculateHeight(node.left);
        const rightHeight = calculateHeight(node.right);

        // 현재 노드를 지나는 경로의 지름 갱신
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

        // 현재 서브트리의 높이 반환
        return 1 + Math.max(leftHeight, rightHeight);
    };

    calculateHeight(root);

    return maxDiameter;
};