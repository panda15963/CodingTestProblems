class MedianHeap {
    private data: number[] = [];
    private compare: (a: number, b: number) => boolean;

    constructor(compare: (a: number, b: number) => boolean) {
        this.compare = compare;
    }

    size(): number {
        return this.data.length;
    }

    peek(): number {
        return this.data[0];
    }

    push(value: number): void {
        const data = this.data;
        data.push(value);

        let i = data.length - 1;

        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);

            if (!this.compare(data[i], data[parent])) break;

            [data[i], data[parent]] = [data[parent], data[i]];
            i = parent;
        }
    }

    pop(): number {
        const data = this.data;
        const result = data[0];
        const last = data.pop()!;

        if (data.length > 0) {
            data[0] = last;

            let i = 0;

            while (true) {
                let best = i;
                const left = i * 2 + 1;
                const right = i * 2 + 2;

                if (
                    left < data.length &&
                    this.compare(data[left], data[best])
                ) {
                    best = left;
                }

                if (
                    right < data.length &&
                    this.compare(data[right], data[best])
                ) {
                    best = right;
                }

                if (best === i) break;

                [data[i], data[best]] = [data[best], data[i]];
                i = best;
            }
        }

        return result;
    }
}

function minOperations(nums: number[], x: number, k: number): number {
    const n = nums.length;
    const INF = Number.MAX_SAFE_INTEGER / 2;

    const minOps = getMinOps(nums, x);

    const dp: number[][] = Array.from(
        { length: n + 1 },
        () => new Array(k + 1).fill(INF)
    );

    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }

    for (let i = n - 1; i >= 0; i--) {
        for (let j = 1; j <= k; j++) {
            const skip = dp[i + 1][j];

            const pick = i + x <= n
                ? minOps[i] + dp[i + x][j - 1]
                : INF;

            dp[i][j] = Math.min(skip, pick);
        }
    }

    return dp[0][k];

    function getMinOps(nums: number[], x: number): number[] {
        const minOps: number[] = [];

        const lower = new MedianHeap((a, b) => a > b);
        const upper = new MedianHeap((a, b) => a < b);

        const delayedLower = new Map<number, number>();
        const delayedUpper = new Map<number, number>();

        let lowerSize = 0;
        let upperSize = 0;

        let lowerSum = 0;
        let upperSum = 0;

        const prune = (
            heap: MedianHeap,
            delayed: Map<number, number>
        ): void => {
            while (heap.size() > 0) {
                const value = heap.peek();
                const count = delayed.get(value) || 0;

                if (count === 0) break;

                heap.pop();

                if (count === 1) {
                    delayed.delete(value);
                } else {
                    delayed.set(value, count - 1);
                }
            }
        };

        const rebalance = (): void => {
            prune(lower, delayedLower);
            prune(upper, delayedUpper);

            if (lowerSize < upperSize) {
                const value = upper.pop();

                lower.push(value);
                upperSize--;
                lowerSize++;

                upperSum -= value;
                lowerSum += value;
            } else if (lowerSize > upperSize + 1) {
                const value = lower.pop();

                upper.push(value);
                lowerSize--;
                upperSize++;

                lowerSum -= value;
                upperSum += value;
            }

            prune(lower, delayedLower);
            prune(upper, delayedUpper);
        };

        const add = (value: number): void => {
            prune(lower, delayedLower);

            if (lowerSize === 0 || value <= lower.peek()) {
                lower.push(value);
                lowerSize++;
                lowerSum += value;
            } else {
                upper.push(value);
                upperSize++;
                upperSum += value;
            }

            rebalance();
        };

        const remove = (value: number): void => {
            prune(lower, delayedLower);

            if (value <= lower.peek()) {
                delayedLower.set(
                    value,
                    (delayedLower.get(value) || 0) + 1
                );

                lowerSize--;
                lowerSum -= value;

                if (value === lower.peek()) {
                    prune(lower, delayedLower);
                }
            } else {
                delayedUpper.set(
                    value,
                    (delayedUpper.get(value) || 0) + 1
                );

                upperSize--;
                upperSum -= value;

                if (upper.size() > 0 && value === upper.peek()) {
                    prune(upper, delayedUpper);
                }
            }

            rebalance();
        };

        for (let i = 0; i < nums.length; i++) {
            add(nums[i]);

            if (i >= x) {
                remove(nums[i - x]);
            }

            if (i >= x - 1) {
                prune(lower, delayedLower);
                prune(upper, delayedUpper);

                const median = lower.peek();

                const ops =
                    median * lowerSize - lowerSum +
                    upperSum - median * upperSize;

                minOps.push(ops);
            }
        }

        return minOps;
    }
}