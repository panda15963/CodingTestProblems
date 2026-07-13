var mergeKLists = function(lists) {
    if (lists === null || lists.length === 0) {
        return null;
    }

    for (let i = 0; i < lists.length - 1; i++) {
        lists[i + 1] = mergeTwoLists(lists[i], lists[i + 1]);
    }

    return lists[lists.length - 1];
};

function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;

    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }

        current = current.next;
    }

    if (l1 !== null) {
        current.next = l1;
    }

    if (l2 !== null) {
        current.next = l2;
    }

    return dummy.next;
}