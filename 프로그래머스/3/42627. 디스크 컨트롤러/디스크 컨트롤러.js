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

function solution(jobs) {
    jobs.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    const pq = new MinHeap((a, b) => a[1] - b[1] || a[0] - b[0] || a[2] - b[2]);

    let time = 0;
    let idx = 0;
    let total = 0;
    let jobNo = 0;

    while (idx < jobs.length || pq.size() > 0) {
        while (idx < jobs.length && jobs[idx][0] <= time) {
            pq.push([jobs[idx][0], jobs[idx][1], jobNo++]);
            idx++;
        }

        if (pq.size() === 0) {
            time = jobs[idx][0];
            continue;
        }

        const [request, duration] = pq.pop();
        time += duration;
        total += time - request;
    }

    return Math.floor(total / jobs.length);
}
