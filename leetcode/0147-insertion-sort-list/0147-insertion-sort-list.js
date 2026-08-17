/**
 * Definition for singly-linked list node.
 * LeetCode에서는 ListNode가 이미 정의되어 있으므로
 * 별도로 선언할 필요가 없습니다.
 */

/**
 * Sorts a linked list using insertion sort algorithm
 *
 * @param {ListNode | null} head
 * @returns {ListNode | null}
 */
function insertionSortList(head) {
    // 빈 리스트 또는 노드가 하나인 경우
    if (head === null || head.next === null) {
        return head;
    }

    // 더미 노드
    const dummy = {
        val: head.val,
        next: head
    };

    // 이전 노드
    let previous = dummy;

    // 현재 처리할 노드
    let current = head;

    while (current !== null) {

        // 이미 정렬된 위치에 있는 경우
        if (previous.val <= current.val) {
            previous = current;
            current = current.next;
            continue;
        }

        // current가 들어갈 위치 탐색
        let insertPosition = dummy;

        while (
            insertPosition.next !== null &&
            insertPosition.next.val <= current.val
        ) {
            insertPosition = insertPosition.next;
        }

        // 다음에 처리할 노드 저장
        const nextNode = current.next;

        // current를 올바른 위치에 삽입
        current.next = insertPosition.next;
        insertPosition.next = current;

        // 기존 위치에서는 current 제거
        previous.next = nextNode;

        // 다음 노드로 이동
        current = nextNode;
    }

    // dummy 다음부터 실제 정렬된 리스트
    return dummy.next;
}