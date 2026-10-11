var flatten = function(head) {
    flattenGetTail(head);
    return head;
};

function flattenGetTail(head) {
    let currentNode = head;
    let lastNode = null;

    while (currentNode) {
        const nextNode = currentNode.next;

        if (currentNode.child) {
            const childHead = currentNode.child;
            const childTail = flattenGetTail(childHead);

            currentNode.child = null;

            currentNode.next = childHead;
            childHead.prev = currentNode;

            if (childTail) {
                childTail.next = nextNode;

                if (nextNode) {
                    nextNode.prev = childTail;
                }

                lastNode = childTail;
            }
        } else {
            lastNode = currentNode;
        }

        currentNode = nextNode;
    }

    return lastNode;
}