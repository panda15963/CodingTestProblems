function reverseList(head: ListNode | null): ListNode | null {
    if (head === null) {
        return null;
    }

    let newHead: ListNode = head;

    if (head.next !== null) {
        newHead = reverseList(head.next);

        head.next.next = head;
    }

    head.next = null;

    return newHead;
}