var kSmallestPairs = function(nums1, nums2, k) {
    const m = nums1.length;
    const n = nums2.length;
    const result = [];

    const minHeap = [];

    const compareFn = (a, b) => {
        return (
            nums1[a[0]] + nums2[a[1]] -
            nums1[b[0]] - nums2[b[1]]
        );
    };

    const heapPush = (item) => {
        minHeap.push(item);

        let currentIndex = minHeap.length - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);

            if (
                compareFn(
                    minHeap[currentIndex],
                    minHeap[parentIndex]
                ) < 0
            ) {
                [
                    minHeap[currentIndex],
                    minHeap[parentIndex]
                ] = [
                    minHeap[parentIndex],
                    minHeap[currentIndex]
                ];

                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    };

    const heapPop = () => {
        if (minHeap.length === 0) return undefined;

        if (minHeap.length === 1) {
            return minHeap.pop();
        }

        const min = minHeap[0];
        minHeap[0] = minHeap.pop();

        let currentIndex = 0;

        while (true) {
            const leftChild = currentIndex * 2 + 1;
            const rightChild = currentIndex * 2 + 2;

            let smallest = currentIndex;

            if (
                leftChild < minHeap.length &&
                compareFn(
                    minHeap[leftChild],
                    minHeap[smallest]
                ) < 0
            ) {
                smallest = leftChild;
            }

            if (
                rightChild < minHeap.length &&
                compareFn(
                    minHeap[rightChild],
                    minHeap[smallest]
                ) < 0
            ) {
                smallest = rightChild;
            }

            if (smallest === currentIndex) break;

            [
                minHeap[currentIndex],
                minHeap[smallest]
            ] = [
                minHeap[smallest],
                minHeap[currentIndex]
            ];

            currentIndex = smallest;
        }

        return min;
    };

    for (let i = 0; i < Math.min(k, m); i++) {
        heapPush([i, 0]);
    }

    while (k > 0 && minHeap.length > 0) {
        const [index1, index2] = heapPop();

        result.push([
            nums1[index1],
            nums2[index2]
        ]);

        if (index2 + 1 < n) {
            heapPush([index1, index2 + 1]);
        }

        k--;
    }

    return result;
};