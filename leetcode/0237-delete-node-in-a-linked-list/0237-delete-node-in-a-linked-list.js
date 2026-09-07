function deleteNode(node) {
    // node 또는 다음 노드가 없는 경우
    if (node === null || node.next === null) {
        return;
    }

    // 다음 노드의 값을 현재 노드에 복사
    node.val = node.next.val;

    // 다음 노드를 건너뛰도록 연결
    node.next = node.next.next;
}