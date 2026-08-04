/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function sortedListToBST(head: ListNode | null): TreeNode | null {
    const nums: number[] = listToArray(head);
    return buildSubTree(nums, 0, nums.length - 1);
}

function listToArray(head: ListNode | null): number[] {
    const nums: number[] = [];

    while (head !== null) {
        nums.push(head.val);
        head = head.next;
    }

    return nums;
}

function buildSubTree(
    nums: number[],
    start: number,
    end: number
): TreeNode | null {
    if (start > end) {
        return null;
    }

    const mid: number = Math.floor((start + end) / 2);
    const node = new TreeNode(nums[mid]);

    node.left = buildSubTree(nums, start, mid - 1);
    node.right = buildSubTree(nums, mid + 1, end);

    return node;
}