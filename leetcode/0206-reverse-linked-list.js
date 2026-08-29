var reverseList = function(head) {
    if (!head) {
        return null;
    }

    let newHead = head;

    if (head.next) {
        newHead = reverseList(head.next);

        head.next.next = head;
    }

    head.next = null;

    return newHead;
};