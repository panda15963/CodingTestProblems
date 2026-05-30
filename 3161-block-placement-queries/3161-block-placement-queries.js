function getResults(queries) {
    const MAX_X = 50000;
    const tree = new Array(4 * (MAX_X + 2)).fill(0);

    function update(node, start, end, idx, val) {
        if (start === end) {
            tree[node] = val;
            return;
        }
        const mid = Math.floor((start + end) / 2);
        if (idx <= mid) update(node * 2, start, mid, idx, val);
        else update(node * 2 + 1, mid + 1, end, idx, val);
        tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);
    }

    function query(node, start, end, L, R) {
        if (L > end || R < start) return 0;
        if (L <= start && end <= R) return tree[node];
        const mid = Math.floor((start + end) / 2);
        return Math.max(
            query(node * 2, start, mid, L, R),
            query(node * 2 + 1, mid + 1, end, L, R)
        );
    }

    function lowerBound(arr, target) {
        let l = 0, r = arr.length;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (arr[mid] < target) l = mid + 1;
            else r = mid;
        }
        return l;
    }

    const result = [];
    const obstacles = [0, MAX_X + 1];

    update(1, 0, MAX_X + 1, MAX_X + 1, MAX_X + 1);

    for (const q of queries) {
        const type = q[0];

        if (type === 1) {
            const x = q[1];
            const idx = lowerBound(obstacles, x);
            const prev = obstacles[idx - 1];
            const next = obstacles[idx];

            obstacles.splice(idx, 0, x);

            update(1, 0, MAX_X + 1, x, x - prev);
            update(1, 0, MAX_X + 1, next, next - x);
        } else if (type === 2) {
            const x = q[1];
            const sz = q[2];

            const maxInternalGap = query(1, 0, MAX_X + 1, 0, x);
            const idx = lowerBound(obstacles, x);
            const lastObstacle = obstacles[idx - 1];
            const trailingGap = x - lastObstacle;

            result.push(maxInternalGap >= sz || trailingGap >= sz);
        }
    }

    return result;
}