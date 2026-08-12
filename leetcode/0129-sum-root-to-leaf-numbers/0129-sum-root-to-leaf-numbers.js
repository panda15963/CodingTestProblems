function sumNumbers(root) {
    /**
     * DFS를 이용해 root부터 현재 노드까지 만들어진 숫자를 계산
     */
    function depthFirstSearch(node, currentPathNumber) {
        // 빈 노드
        if (!node) {
            return 0;
        }

        // 현재 노드의 값을 기존 숫자 뒤에 추가
        currentPathNumber = currentPathNumber * 10 + node.val;

        // 리프 노드라면 현재 경로의 숫자 반환
        if (!node.left && !node.right) {
            return currentPathNumber;
        }

        // 왼쪽 서브트리
        const leftSum = depthFirstSearch(
            node.left,
            currentPathNumber
        );

        // 오른쪽 서브트리
        const rightSum = depthFirstSearch(
            node.right,
            currentPathNumber
        );

        return leftSum + rightSum;
    }

    // root부터 DFS 시작
    return depthFirstSearch(root, 0);
}