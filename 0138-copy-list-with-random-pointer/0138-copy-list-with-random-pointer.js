function copyRandomList(head) {
    const visitedHash = new Map();

    function clone(node) {
        if (node === null) {
            return null;
        }

        // 이미 복사한 노드라면 기존 복사본 반환
        if (visitedHash.has(node)) {
            return visitedHash.get(node);
        }

        // 새로운 노드 생성
        const newNode = new Node(node.val);

        // 반드시 재귀 호출 전에 저장
        // random/next가 서로를 가리킬 수 있기 때문
        visitedHash.set(node, newNode);

        newNode.next = clone(node.next);
        newNode.random = clone(node.random);

        return newNode;
    }

    return clone(head);
}