class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        int count = 0;
        ListNode currentNode = head;
        while (currentNode != null) {
            currentNode = currentNode.next;
            count++;
        }
        currentNode = head;

        int middleIdx = count / 2;
        ListNode left = head;
        ListNode right = null;

        for (int i = 0; i < middleIdx - 1; i++) {
            currentNode = currentNode.next;
        }
        right = currentNode.next;
        currentNode.next = null;
        left = sortList(left);
        right = sortList(right);

        return merge(left, right);
    }

    private ListNode merge(ListNode left, ListNode right) {
        ListNode dummyHead = new ListNode(0);
        ListNode currentNode = dummyHead;

        while (left != null && right != null) {
            if (left.val < right.val) {
                currentNode.next = left;
                left = left.next;
            } else {
                currentNode.next = right;
                right = right.next;
            }
            currentNode = currentNode.next;
        }
        if (left != null) {
            currentNode.next = left;
        } else {
            currentNode.next = right;
        }
        return dummyHead.next;
    }
}