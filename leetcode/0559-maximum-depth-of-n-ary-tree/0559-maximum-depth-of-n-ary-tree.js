/**
 * Definition for a Node.
 * class Node {
 *     constructor(val, children) {
 *         this.val = val;
 *         this.children = children;
 *     }
 * }
 */

/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function(root) {
    // 트리가 비어 있는 경우
    if (!root) {
        return 0;
    }

    // 자식 노드가 없는 경우 (리프 노드)
    if (root.children.length === 0) {
        return 1;
    }

    // 모든 자식 노드의 깊이 계산
    const childDepths = root.children.map((child) => maxDepth(child));

    // 가장 깊은 자식 노드의 깊이 선택
    const maxChildDepth = Math.max(...childDepths);

    return 1 + maxChildDepth;
};