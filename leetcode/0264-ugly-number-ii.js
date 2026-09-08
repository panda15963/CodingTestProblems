function nthUglyNumber(n) {
    // 최소 힙
    const tree = new Array(100000).fill(0);
    let lastnode = 1;

    // 최소 힙에 데이터 추가
    function push(data) {
        lastnode++;
        tree[lastnode] = data;

        let child = lastnode;
        let parent = Math.floor(child / 2);

        // 위로 이동하며 최소 힙 유지
        while (parent > 0) {
            if (tree[parent] > tree[child]) {
                const temp = tree[parent];
                tree[parent] = tree[child];
                tree[child] = temp;

                child = parent;
                parent = Math.floor(child / 2);
            } else {
                break;
            }
        }
    }

    // 최소 힙에서 최솟값 제거
    function pop() {
        const result = tree[1];

        tree[1] = tree[lastnode];
        lastnode--;

        let parent = 1;

        // 아래로 이동하며 최소 힙 유지
        while (parent * 2 <= lastnode) {
            const left = parent * 2;
            const right = left + 1;

            let child;

            // 더 작은 자식 선택
            if (
                right <= lastnode &&
                tree[right] < tree[left]
            ) {
                child = right;
            } else {
                child = left;
            }

            if (tree[child] < tree[parent]) {
                const temp = tree[parent];
                tree[parent] = tree[child];
                tree[child] = temp;

                parent = child;
            } else {
                break;
            }
        }

        return result;
    }

    // 첫 번째 Ugly Number
    tree[1] = 1;

    let last = 0;

    while (true) {
        const value = pop();

        // 중복 제거
        if (last !== value) {
            n--;

            if (n === 0) {
                return value;
            }

            push(value * 2);
            push(value * 3);
            push(value * 5);

            last = value;
        }
    }
}