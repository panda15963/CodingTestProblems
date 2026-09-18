var oddEvenList = function(head) {
    if (!head) {
        return null;
    }

    let oddTail = head;
    let evenTail = head.next;
    const evenHead = head.next;

    while (evenTail && evenTail.next) {
        oddTail.next = evenTail.next;
        oddTail = oddTail.next;

        evenTail.next = oddTail.next;
        evenTail = evenTail.next;
    }

    oddTail.next = evenHead;

    return head;
};