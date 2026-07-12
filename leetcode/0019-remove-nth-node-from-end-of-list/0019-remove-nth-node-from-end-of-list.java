class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // 더미 노드 생성하여 head 앞에 배치 (예외 처리 용이)
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        
        ListNode fast = dummy;
        ListNode slow = dummy;
        
        // fast 포인터를 n + 1 만큼 앞으로 이동시킵니다.
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }
        
        // fast 포인터가 끝(null)에 도달할 때까지 두 포인터를 함께 이동시킵니다.
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        
        // slow 포인터는 삭제할 노드의 바로 이전 노드를 가리키게 되므로 건너뛰어 삭제합니다.
        slow.next = slow.next.next;
        
        return dummy.next;
    }
}
