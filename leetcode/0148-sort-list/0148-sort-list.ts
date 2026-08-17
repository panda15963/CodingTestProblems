/**
 * Definition for singly-linked list.
 * LeetCode에서는 ListNode가 이미 정의되어 있다고 가정합니다.
 */

/**
 * @param head
 * @returns 정렬된 연결 리스트
 */
function sortList(head: ListNode | null): ListNode | null {
    // 빈 리스트 또는 노드가 하나인 경우
    if (head === null || head.next === null) {
        return head;
    }

    // 리스트 길이 계산
    let count: number = 0;
    let currentNode: ListNode | null = head;

    while (currentNode !== null) {
        currentNode = currentNode.next;
        count++;
    }

    currentNode = head;

    // 중간 위치
    const middleIdx: number = Math.floor(count / 2);

    let left: ListNode | null = head;
    let right: ListNode | null = null;

    // 중간 노드 찾기
    for (let i = 0; i < middleIdx - 1; i++) {
        currentNode = currentNode!.next;
    }

    // 리스트를 두 부분으로 분리
    right = currentNode!.next;
    currentNode!.next = null;

    // 각각 정렬
    left = sortList(left);
    right = sortList(right);

    // 두 리스트 병합
    return merge(left, right);
}

/**
 * 두 정렬된 연결 리스트를 병합
 */
function merge(
    left: ListNode | null,
    right: ListNode | null
): ListNode | null {

    const dummyHead: ListNode = new ListNode(0);
    let currentNode: ListNode = dummyHead;

    while (left !== null && right !== null) {
        if (left.val < right.val) {
            currentNode.next = left;
            left = left.next;
        } else {
            currentNode.next = right;
            right = right.next;
        }

        currentNode = currentNode.next;
    }

    if (left !== null) {
        currentNode.next = left;
    } else {
        currentNode.next = right;
    }

    return dummyHead.next;
}