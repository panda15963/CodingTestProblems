function kthSmallest(root, k) {
    let result = null;

    function traverse(node) {
        // 노드가 없거나 이미 결과를 찾은 경우
        if (node === null || result !== null) {
            return;
        }

        // 왼쪽 서브트리 탐색
        traverse(node.left);

        // 이미 결과를 찾았다면 종료
        if (result !== null) {
            return;
        }

        // 현재 노드 방문
        k--;

        // k번째로 작은 값인 경우
        if (k === 0) {
            result = node.val;
            return;
        }

        // 오른쪽 서브트리 탐색
        traverse(node.right);
    }

    traverse(root);

    return result;
}