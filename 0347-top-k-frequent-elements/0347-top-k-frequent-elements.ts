function topKFrequent(nums: number[], k: number): number[] {
    const frequencyMap = new Map<number, number>();

    for (const num of nums) {
        frequencyMap.set(
            num,
            (frequencyMap.get(num) ?? 0) + 1
        );
    }

    // [frequency, num]
    const minHeap: [number, number][] = [];

    function push(item: [number, number]): void {
        minHeap.push(item);

        let i = minHeap.length - 1;

        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);

            if (minHeap[parent][0] <= minHeap[i][0]) {
                break;
            }

            [minHeap[parent], minHeap[i]] =
                [minHeap[i], minHeap[parent]];

            i = parent;
        }
    }

    function pop(): [number, number] {
        const root = minHeap[0];
        const last = minHeap.pop()!;

        if (minHeap.length > 0) {
            minHeap[0] = last;

            let i = 0;

            while (true) {
                let smallest = i;
                const left = i * 2 + 1;
                const right = i * 2 + 2;

                if (
                    left < minHeap.length &&
                    minHeap[left][0] < minHeap[smallest][0]
                ) {
                    smallest = left;
                }

                if (
                    right < minHeap.length &&
                    minHeap[right][0] < minHeap[smallest][0]
                ) {
                    smallest = right;
                }

                if (smallest === i) {
                    break;
                }

                [minHeap[i], minHeap[smallest]] =
                    [minHeap[smallest], minHeap[i]];

                i = smallest;
            }
        }

        return root;
    }

    for (const [num, frequency] of frequencyMap) {
        push([frequency, num]);

        if (minHeap.length > k) {
            pop();
        }
    }

    const result: number[] = [];

    while (minHeap.length > 0) {
        result.push(pop()[1]);
    }

    return result;
}