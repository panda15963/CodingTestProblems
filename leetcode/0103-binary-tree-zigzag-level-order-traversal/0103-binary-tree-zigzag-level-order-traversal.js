/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 */

/**
 * @param {TreeNode|null} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
    const answer = [];

    function zigzagLevelTraversal(node, level) {
        if (node === null) {
            return;
        }

        // 해당 레벨의 배열이 없으면 생성
        if (answer.length === level) {
            answer.push([]);
        }

        zigzagLevelTraversal(node.left, level + 1);

        if (level % 2 === 0) {
            // 짝수 레벨: 뒤에 추가
            answer[level].push(node.val);
        } else {
            // 홀수 레벨: 앞에 추가
            answer[level].unshift(node.val);
        }

        zigzagLevelTraversal(node.right, level + 1);
    }

    zigzagLevelTraversal(root, 0);

    return answer;
};