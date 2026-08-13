/**
 * Definition for _Node.
 *
 * class _Node {
 *     constructor(val = 0, neighbors = []) {
 *         this.val = val;
 *         this.neighbors = neighbors;
 *     }
 * }
 */

/**
 * Clones an undirected graph using depth-first search
 *
 * @param {_Node|null} node
 * @returns {_Node|null}
 */
function cloneGraph(node) {
    // 원본 노드 -> 복제 노드
    const visitedNodes = new Map();

    /**
     * DFS를 이용해 그래프를 복제
     *
     * @param {_Node|null} currentNode
     * @returns {_Node|null}
     */
    const deepClone = (currentNode) => {
        // 현재 노드가 없다면
        if (!currentNode) {
            return null;
        }

        // 이미 복제한 노드라면 기존 복제 노드 반환
        if (visitedNodes.has(currentNode)) {
            return visitedNodes.get(currentNode);
        }

        // 현재 노드 복제
        const clonedNode = new _Node(currentNode.val);

        // 중요:
        // 이 노드를 먼저 Map에 저장해야 순환 구조에서도
        // 무한 재귀가 발생하지 않는다.
        visitedNodes.set(currentNode, clonedNode);

        // 모든 이웃 노드 복제
        for (const neighbor of currentNode.neighbors) {
            clonedNode.neighbors.push(
                deepClone(neighbor)
            );
        }

        return clonedNode;
    };

    return deepClone(node);
}