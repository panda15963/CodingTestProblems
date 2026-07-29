/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 */

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
function generateTrees(n) {
    /**
     * @param {number} start
     * @param {number} end
     * @return {TreeNode[]}
     */
    function generateBSTsInRange(start, end) {
        // 범위를 벗어나면 빈 트리 반환
        if (start > end) {
            return [null];
        }

        const possibleTrees = [];

        // 각 값을 루트로 선택
        for (let rootValue = start; rootValue <= end; rootValue++) {
            // 가능한 왼쪽 서브트리 생성
            const leftSubtrees = generateBSTsInRange(start, rootValue - 1);

            // 가능한 오른쪽 서브트리 생성
            const rightSubtrees = generateBSTsInRange(rootValue + 1, end);

            // 모든 조합 생성
            for (const leftSubtree of leftSubtrees) {
                for (const rightSubtree of rightSubtrees) {
                    const currentRoot = new TreeNode(
                        rootValue,
                        leftSubtree,
                        rightSubtree
                    );
                    possibleTrees.push(currentRoot);
                }
            }
        }

        return possibleTrees;
    }

    if (n === 0) {
        return [];
    }

    return generateBSTsInRange(1, n);
}