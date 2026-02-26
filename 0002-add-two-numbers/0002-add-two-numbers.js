/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode(0);  // 가짜 헤드 노드
    let current = dummy;
    let carry = 0;  // 올림
    
    // l1, l2 중 하나라도 남아있거나 올림이 있을 때까지 반복
    while (l1 || l2 || carry) {
        let sum = carry;
        
        // l1이 있으면 더함
        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }
        
        // l2가 있으면 더함
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }
        
        // 새로운 노드 생성 (올림 처리)
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
    }
    
    return dummy.next;  // 실제 헤드 반환
};
