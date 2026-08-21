/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val === undefined ? 0 : val)
 *         this.left = (left === undefined ? null : left)
 *         this.right = (right === undefined ? null : right)
 *     }
 * }
 */

class BSTIterator {
    // Java의 Deque<TreeNode> 역할
    private nodes: TreeNode[];

    constructor(root: TreeNode | null) {
        this.nodes = [];

        this.addLeft(root);
    }

    // 현재 노드부터 왼쪽으로 계속 내려가면서 스택에 저장
    private addLeft(node: TreeNode | null): void {
        while (node !== null) {
            this.nodes.push(node);
            node = node.left;
        }
    }

    next(): number {
        // Java의 pollLast()와 동일
        const now = this.nodes.pop()!;

        // 현재 노드의 오른쪽 서브트리가 있다면
        // 오른쪽으로 이동한 후 다시 가장 왼쪽까지 탐색
        if (now.right !== null) {
            this.addLeft(now.right);
        }

        return now.val;
    }

    hasNext(): boolean {
        return this.nodes.length > 0;
    }
}