/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.next = (next === undefined ? null : next);
 * }
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 */

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
    const nums = listToArray(head);
    return buildSubTree(nums, 0, nums.length - 1);
};

function listToArray(head) {
    const nums = [];

    while (head !== null) {
        nums.push(head.val);
        head = head.next;
    }

    return nums;
}

function buildSubTree(nums, start, end) {
    if (start > end) {
        return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new TreeNode(nums[mid]);

    node.left = buildSubTree(nums, start, mid - 1);
    node.right = buildSubTree(nums, mid + 1, end);

    return node;
}