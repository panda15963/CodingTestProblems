function nthUglyNumber(n: number): number {
    // 최소 힙
    const tree: number[] = new Array<number>(100000).fill(0);
    let lastnode: number = 1;

    // 최소 힙에 데이터 추가
    function push(data: number): void {
        lastnode++;
        tree[lastnode] = data;

        let child: number = lastnode;
        let parent: number = Math.floor(child / 2);

        // 위로 이동하며 최소 힙 유지
        while (parent > 0) {
            if (tree[parent] > tree[child]) {
                const temp: number = tree[parent];
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
    function pop(): number {
        const result: number = tree[1];

        // 마지막 노드를 루트로 이동
        tree[1] = tree[lastnode];
        lastnode--;

        let parent: number = 1;

        // 아래로 이동하며 최소 힙 유지
        while (parent * 2 <= lastnode) {
            const left: number = parent * 2;
            const right: number = left + 1;

            let child: number;

            // 더 작은 자식 선택
            if (
                right <= lastnode &&
                tree[right] < tree[left]
            ) {
                child = right;
            } else {
                child = left;
            }

            // 부모와 자식 교환
            if (tree[child] < tree[parent]) {
                const temp: number = tree[parent];
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

    let last: number = 0;

    while (true) {
        const value: number = pop();

        // 중복된 Ugly Number 제거
        if (last !== value) {
            n--;

            // n번째 Ugly Number를 찾은 경우
            if (n === 0) {
                return value;
            }

            // 다음 Ugly Number 후보 추가
            push(value * 2);
            push(value * 3);
            push(value * 5);

            last = value;
        }
    }
}