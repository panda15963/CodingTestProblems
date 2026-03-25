class MinHeap {
    constructor(compare) {
        this.heap = [];
        this.compare = compare;
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(value) {
        this.heap.push(value);
        let idx = this.heap.length - 1;

        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.compare(this.heap[parent], this.heap[idx]) <= 0) break;
            [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
            idx = parent;
        }
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();

        let idx = 0;
        while (true) {
            let left = idx * 2 + 1;
            let right = idx * 2 + 2;
            let smallest = idx;

            if (left < this.heap.length && this.compare(this.heap[left], this.heap[smallest]) < 0) smallest = left;
            if (right < this.heap.length && this.compare(this.heap[right], this.heap[smallest]) < 0) smallest = right;

            if (smallest === idx) break;
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }

        return top;
    }
}

function solution(operations) {
    const minHeap = new MinHeap((a, b) => a.value - b.value || a.id - b.id);
    const maxHeap = new MinHeap((a, b) => b.value - a.value || a.id - b.id);
    const removed = new Set();
    let id = 0;

    const cleanMin = () => {
        while (minHeap.size() && removed.has(minHeap.peek().id)) minHeap.pop();
    };

    const cleanMax = () => {
        while (maxHeap.size() && removed.has(maxHeap.peek().id)) maxHeap.pop();
    };

    for (const op of operations) {
        const [cmd, num] = op.split(' ');
        if (cmd === 'I') {
            const value = Number(num);
            minHeap.push({ value, id });
            maxHeap.push({ value, id });
            id++;
        } else if (num === '1') {
            cleanMax();
            if (maxHeap.size()) removed.add(maxHeap.pop().id);
        } else {
            cleanMin();
            if (minHeap.size()) removed.add(minHeap.pop().id);
        }
    }

    cleanMin();
    cleanMax();

    if (!minHeap.size() || !maxHeap.size()) return [0, 0];
    return [maxHeap.peek().value, minHeap.peek().value];
}
