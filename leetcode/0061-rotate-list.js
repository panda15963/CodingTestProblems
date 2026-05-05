/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = (val === undefined ? 0 : val);
 *   this.next = (next === undefined ? null : next);
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) {
        return head;
    }

    // 1) 길이 구하기 + tail 찾기
    let length = 1;
    let tail = head;

    while (tail.next) {
        tail = tail.next;
        length++;
    }

    // 2) 실제 회전 횟수 줄이기
    k = k % length;
    if (k === 0) {
        return head;
    }

    // 3) 원형으로 연결
    tail.next = head;

    // 4) 새 tail 위치 찾기: length - k - 1번째
    let stepsToNewTail = length - k - 1;
    let newTail = head;

    while (stepsToNewTail > 0) {
        newTail = newTail.next;
        stepsToNewTail--;
    }

    // 5) 새 head 설정하고 끊기
    const newHead = newTail.next;
    newTail.next = null;

    return newHead;
};