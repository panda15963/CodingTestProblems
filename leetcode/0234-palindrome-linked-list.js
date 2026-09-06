function isPalindrome(head) {
    let rev = null;
    let slow = head;
    let fast = head;

    // 연결 리스트의 앞 절반을 뒤집으면서 중간 찾기
    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;

        const next = slow.next;
        slow.next = rev;
        rev = slow;
        slow = next;
    }

    // 연결 리스트 길이가 홀수인 경우 가운데 노드 건너뛰기
    if (fast !== null) {
        slow = slow.next;
    }

    // 앞부분과 뒷부분 비교
    while (rev !== null && rev.val === slow.val) {
        rev = rev.next;
        slow = slow.next;
    }

    // 모든 값이 일치하면 팰린드롬
    return rev === null;
}