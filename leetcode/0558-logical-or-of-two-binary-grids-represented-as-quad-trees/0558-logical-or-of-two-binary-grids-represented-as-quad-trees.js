/*
// Definition for a QuadTree node.
class Node {
    constructor(
        val = false,
        isLeaf = false,
        topLeft = null,
        topRight = null,
        bottomLeft = null,
        bottomRight = null
    ) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}
*/

/**
 * @param {Node} quadTree1
 * @param {Node} quadTree2
 * @return {Node}
 */
var intersect = function(quadTree1, quadTree2) {
    return mergeQuadTrees(quadTree1, quadTree2);
};

/**
 * Recursively merges two quadtree nodes using logical OR.
 */
function mergeQuadTrees(node1, node2) {
    // Null 처리
    if (!node1 || !node2) {
        return null;
    }

    // Case 1: 두 노드 모두 리프 노드
    if (node1.isLeaf && node2.isLeaf) {
        return new Node(node1.val || node2.val, true);
    }

    // Case 2: 첫 번째 노드가 리프 노드
    if (node1.isLeaf) {
        return node1.val ? node1 : node2;
    }

    // Case 3: 두 번째 노드가 리프 노드
    if (node2.isLeaf) {
        return node2.val ? node2 : node1;
    }

    // Case 4: 두 노드 모두 내부 노드
    const topLeft = mergeQuadTrees(node1.topLeft, node2.topLeft);
    const topRight = mergeQuadTrees(node1.topRight, node2.topRight);
    const bottomLeft = mergeQuadTrees(node1.bottomLeft, node2.bottomLeft);
    const bottomRight = mergeQuadTrees(node1.bottomRight, node2.bottomRight);

    // 모든 자식 노드가 존재하는지 확인
    const allChildrenExist =
        topLeft && topRight && bottomLeft && bottomRight;

    if (allChildrenExist) {
        // 모든 자식 노드가 리프 노드인지 확인
        const allChildrenAreLeaves =
            topLeft.isLeaf &&
            topRight.isLeaf &&
            bottomLeft.isLeaf &&
            bottomRight.isLeaf;

        // 모든 자식 노드의 값이 동일한지 확인
        const allChildrenHaveSameValue =
            topLeft.val === topRight.val &&
            topRight.val === bottomLeft.val &&
            bottomLeft.val === bottomRight.val;

        // 네 자식 노드를 하나의 리프 노드로 병합
        if (allChildrenAreLeaves && allChildrenHaveSameValue) {
            return new Node(topLeft.val, true);
        }
    }

    // 병합된 내부 노드 생성
    return new Node(
        false,
        false,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    );
}