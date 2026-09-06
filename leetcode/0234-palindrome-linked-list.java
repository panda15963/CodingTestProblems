class Solution {

    public boolean isPalindrome(ListNode head) {
        ListNode rev = null;
        ListNode slow = head;
        ListNode fast = head;

        // 연결 리스트의 앞 절반을 뒤집으면서 중간 지점 찾기
        while (fast != null && fast.next != null) {
            fast = fast.next.next;

            ListNode next = slow.next;
            slow.next = rev;
            rev = slow;
            slow = next;
        }

        // 노드 개수가 홀수인 경우 가운데 노드 건너뛰기
        if (fast != null) {
            slow = slow.next;
        }

        // 뒤집은 앞부분과 뒷부분 비교
        while (rev != null && rev.val == slow.val) {
            rev = rev.next;
            slow = slow.next;
        }

        // 모든 노드가 일치하면 팰린드롬
        return rev == null;
    }
}