var swapPairs = function(head) {
    let cur = head;

    while (cur !== null && cur.next !== null) {
        // 두 노드의 값 교환
        const temp = cur.val;
        cur.val = cur.next.val;
        cur.next.val = temp;

        // 다음 두 노드로 이동
        cur = cur.next.next;
    }

    return head;
};