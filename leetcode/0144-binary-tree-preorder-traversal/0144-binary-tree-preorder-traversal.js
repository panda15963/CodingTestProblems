var preorderTraversal = function(root) {
    // 순회 결과를 저장
    const result = [];

    // 전위 순회
    function traversePreorder(node) {
        // 현재 노드가 없으면 종료
        if (node === null) {
            return;
        }

        // Root
        result.push(node.val);

        // Left
        traversePreorder(node.left);

        // Right
        traversePreorder(node.right);
    }

    traversePreorder(root);

    return result;
};