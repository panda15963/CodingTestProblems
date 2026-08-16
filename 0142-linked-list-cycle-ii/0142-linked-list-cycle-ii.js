var detectCycle = function(head) {
    let slow = head;
    let fast = head;

    // 사이클 탐색
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        // 두 포인터가 만난 경우 사이클 존재
        if (slow === fast) {
            // slow를 다시 시작점으로 이동
            slow = head;

            // 사이클의 시작점 탐색
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }

            return slow;
        }
    }

    // 사이클이 없는 경우
    return null;
};