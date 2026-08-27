function rightSideView(root) {
    const q = [];
    const result = [];

    if (root !== null) {
        q.push(root);
    }

    let index = 0;

    while (index < q.length) {
        const size = q.length - index;

        for (let i = 0; i < size; i++) {
            const cur = q[index++];

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