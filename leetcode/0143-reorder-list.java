class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) {
            return;
        }

        // 1. 중간 노드 찾기
        ListNode lastNode = head;
        ListNode midNode = head;

        while (lastNode != null && lastNode.next != null) {
            midNode = midNode.next;
            lastNode = lastNode.next.next;
        }

        // 2. 뒤쪽 리스트 뒤집기
        ListNode secondList = reverseList(midNode.next);

        // 앞쪽 리스트와 분리
        midNode.next = null;

        // 3. 두 리스트를 번갈아가며 연결
        ListNode firstList = head;

        while (firstList != null && secondList != null) {
            ListNode firstNext = firstList.next;
            ListNode secondNext = secondList.next;

            firstList.next = secondList;
            secondList.next = firstNext;

            firstList = firstNext;
            secondList = secondNext;
        }
    }

    private ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        return prev;
    }
}