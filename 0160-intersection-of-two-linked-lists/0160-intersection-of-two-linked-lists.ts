function getIntersectionNode(
    headA: ListNode | null,
    headB: ListNode | null
): ListNode | null {
    let pointerA: ListNode | null = headA;
    let pointerB: ListNode | null = headB;

    while (pointerA !== pointerB) {
        pointerA = pointerA ? pointerA.next : headB;
        pointerB = pointerB ? pointerB.next : headA;
    }

    return pointerA;
}