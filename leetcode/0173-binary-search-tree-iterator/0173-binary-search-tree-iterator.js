/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val, left, right) {
 *         this.val = (val === undefined ? 0 : val);
 *         this.left = (left === undefined ? null : left);
 *         this.right = (right === undefined ? null : right);
 *     }
 * }
 */

var BSTIterator = function(root) {
    // Stack
    this.nodes = [];

    this.addLeft(root);
};

// 현재 노드부터 왼쪽으로 계속 내려가면서 스택에 저장
BSTIterator.prototype.addLeft = function(node) {
    while (node !== null) {
        this.nodes.push(node);
        node = node.left;
    }
};

// 다음으로 작은 값 반환
BSTIterator.prototype.next = function() {
    const now = this.nodes.pop();

    // 오른쪽 서브트리가 있다면
    // 오른쪽으로 이동한 후 가장 왼쪽까지 추가
    if (now.right !== null) {
        this.addLeft(now.right);
    }

    return now.val;
};

// 다음 노드가 존재하는지 확인
BSTIterator.prototype.hasNext = function() {
    return this.nodes.length > 0;
};