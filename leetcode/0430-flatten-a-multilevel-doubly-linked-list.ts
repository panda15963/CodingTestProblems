function flatten(head: Node | null): Node | null {
    flattenGetTail(head);
    return head;
}

function flattenGetTail(head: Node | null): Node | null {
    let currentNode: Node | null = head;
    let lastNode: Node | null = null;

    while (currentNode) {
        const nextNode: Node | null = currentNode.next;

        if (currentNode.child) {
            const childHead: Node = currentNode.child;
            const childTail: Node | null = flattenGetTail(childHead);

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