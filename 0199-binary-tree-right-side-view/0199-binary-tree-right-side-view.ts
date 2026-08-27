function rightSideView(root: TreeNode | null): number[] {
    const q: TreeNode[] = [];
    const result: number[] = [];

    if (root !== null) {
        q.push(root);
    }

    let index: number = 0;

    while (index < q.length) {
        const size: number = q.length - index;

        for (let i = 0; i < size; i++) {
            const cur: TreeNode = q[index++];

            if (cur.left !== null) {
                q.push(cur.left);
            }

            if (cur.right !== null) {
                q.push(cur.right);
            }

            // 현재 레벨의 마지막 노드
            if (i === size - 1) {
                result.push(cur.val);
            }
        }
    }

    return result;
}