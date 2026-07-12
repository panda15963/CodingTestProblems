var removeNthFromEnd = function(head, n) {
    // 더미 노드를 생성하여 head 앞에 배치
    const dummy = new ListNode(0);
    dummy.next = head;

    let fast = dummy;
    let slow = dummy;

    // fast 포인터를 n + 1만큼 앞으로 이동
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // fast가 끝에 도달할 때까지 함께 이동
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // 삭제할 노드를 건너뜀
    slow.next = slow.next.next;

    return dummy.next;
};