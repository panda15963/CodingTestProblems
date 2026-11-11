/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function(root) {
    let totalTilt = 0;

    /**
     * DFS를 이용해 서브트리의 합을 계산
     */
    const calculateSubtreeSum = (node) => {
        // 노드가 없으면 0 반환
        if (!node) {
            return 0;
        }

        // 왼쪽과 오른쪽 서브트리의 합 계산
        const leftSubtreeSum = calculateSubtreeSum(node.left);
        const rightSubtreeSum = calculateSubtreeSum(node.right);

        // 현재 노드의 Tilt 계산
        totalTilt += Math.abs(leftSubtreeSum - rightSubtreeSum);

        // 현재 서브트리 전체 합 반환
        return leftSubtreeSum + rightSubtreeSum + node.val;
    };

    // 루트부터 DFS 시작
    calculateSubtreeSum(root);

    return totalTilt;
};