class MyMinHeap {
    private heap: number[] = [];

    size(): number {
        return this.heap.length;
    }

    peek(): number | undefined {
        return this.heap[0];
    }

    push(value: number): void {
        this.heap.push(value);

        let index = this.heap.length - 1;

        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (this.heap[parent] <= this.heap[index]) {
                break;
            }

            [this.heap[parent], this.heap[index]] =
                [this.heap[index], this.heap[parent]];

            index = parent;
        }
    }

    pop(): number | undefined {
        if (this.heap.length === 0) {
            return undefined;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const result = this.heap[0];
        this.heap[0] = this.heap.pop()!;

        let index = 0;

        while (true) {
            let smallest = index;

            const left = index * 2 + 1;
            const right = index * 2 + 2;

            if (
                left < this.heap.length &&
                this.heap[left] < this.heap[smallest]
            ) {
                smallest = left;
            }

            if (
                right < this.heap.length &&
                this.heap[right] < this.heap[smallest]
            ) {
                smallest = right;
            }

            if (smallest === index) {
                break;
            }

            [this.heap[index], this.heap[smallest]] =
                [this.heap[smallest], this.heap[index]];

            index = smallest;
        }

        return result;
    }
}

class MyMaxHeap {
    private heap: number[] = [];

    size(): number {
        return this.heap.length;
    }

    peek(): number | undefined {
        return this.heap[0];
    }

    push(value: number): void {
        this.heap.push(value);

        let index = this.heap.length - 1;

        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (this.heap[parent] >= this.heap[index]) {
                break;
            }

            [this.heap[parent], this.heap[index]] =
                [this.heap[index], this.heap[parent]];

            index = parent;
        }
    }

    pop(): number | undefined {
        if (this.heap.length === 0) {
            return undefined;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const result = this.heap[0];
        this.heap[0] = this.heap.pop()!;

        let index = 0;

        while (true) {
            let largest = index;

            const left = index * 2 + 1;
            const right = index * 2 + 2;

            if (
                left < this.heap.length &&
                this.heap[left] > this.heap[largest]
            ) {
                largest = left;
            }

            if (
                right < this.heap.length &&
                this.heap[right] > this.heap[largest]
            ) {
                largest = right;
            }

            if (largest === index) {
                break;
            }

            [this.heap[index], this.heap[largest]] =
                [this.heap[largest], this.heap[index]];

            index = largest;
        }

        return result;
    }
}

class MedianFinder {
    private lower: MyMaxHeap;
    private upper: MyMinHeap;

    constructor() {
        this.lower = new MyMaxHeap();
        this.upper = new MyMinHeap();
    }

    addNum(num: number): void {
        if (
            this.upper.size() === 0 ||
            this.upper.peek()! < num
        ) {
            this.upper.push(num);
        } else {
            this.lower.push(num);
        }

        if (this.lower.size() > this.upper.size()) {
            this.upper.push(this.lower.pop()!);
        } else if (
            this.lower.size() + 1 < this.upper.size()
        ) {
            this.lower.push(this.upper.pop()!);
        }
    }

    findMedian(): number {
        if (this.lower.size() < this.upper.size()) {
            return this.upper.peek()!;
        }

        return (this.lower.peek()! + this.upper.peek()!) / 2;
    }
}