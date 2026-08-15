function copyRandomList(head: Node | null): Node | null {
    const visitedHash: Map<Node, Node> = new Map();

    function clone(node: Node | null): Node | null {
        if (node === null) {
            return null;
        }

        // 이미 복사한 노드라면 기존 복사본 반환
        if (visitedHash.has(node)) {
            return visitedHash.get(node)!;
        }

        // 새로운 노드 생성
        const newNode = new Node(node.val);

        // 재귀 호출 전에 저장
        visitedHash.set(node, newNode);

        newNode.next = clone(node.next);
        newNode.random = clone(node.random);

        return newNode;
    }

    return clone(head);
}