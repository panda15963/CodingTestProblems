function swapPairs(head: ListNode | null): ListNode | null {
    let cur: ListNode | null = head;

    while (cur !== null && cur.next !== null) {
        // 두 노드의 값 교환
        const temp: number = cur.val;
        cur.val = cur.next.val;
        cur.next.val = temp;

        // 다음 두 노드로 이동
        cur = cur.next.next;
    }

    return head;
}