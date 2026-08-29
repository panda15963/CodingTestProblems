var removeElements = function(head, val) {
    const dummyNode = new ListNode(0, head);

    let currentNode = dummyNode;

    while (currentNode.next !== null) {
        if (currentNode.next.val === val) {
            currentNode.next = currentNode.next.next;
        } else {
            currentNode = currentNode.next;
        }
    }

    return dummyNode.next;
};