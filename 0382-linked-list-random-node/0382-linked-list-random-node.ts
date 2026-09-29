class Solution {
    private head: ListNode | null;

    constructor(head: ListNode | null) {
        this.head = head;
    }

    getRandom(): number {
        let count = 0;
        let result = 0;

        let current = this.head;

        while (current !== null) {
            count++;

            const randomIndex =
                Math.floor(Math.random() * count) + 1;

            if (randomIndex === count) {
                result = current.val;
            }

            current = current.next;
        }

        return result;
    }
}