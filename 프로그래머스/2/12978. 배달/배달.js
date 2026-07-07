class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.heap.length - 1;

        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);

            if (this.heap[parent].distance <= this.heap[idx].distance) break;

            [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
            idx = parent;
        }
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();

        return min;
    }

    bubbleDown() {
        let idx = 0;

        while (true) {
            let left = idx * 2 + 1;
            let right = idx * 2 + 2;
            let smallest = idx;

            if (
                left < this.heap.length &&
                this.heap[left].distance < this.heap[smallest].distance
            ) {
                smallest = left;
            }

            if (
                right < this.heap.length &&
                this.heap[right].distance < this.heap[smallest].distance
            ) {
                smallest = right;
            }

            if (smallest === idx) break;

            [this.heap[idx], this.heap[smallest]] = [
                this.heap[smallest],
                this.heap[idx],
            ];

            idx = smallest;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function solution(villageNum, roadInfoArr, targetTime) {
    const graph = Array.from({ length: villageNum + 1 }, () => []);
    const dist = new Array(villageNum + 1).fill(Infinity);

    // 그래프 생성
    for (const [start, dest, roadLength] of roadInfoArr) {
        graph[start].push({ destination: dest, distance: roadLength });
        graph[dest].push({ destination: start, distance: roadLength });
    }

    dijkstra(1);

    let answer = 0;

    for (const time of dist) {
        if (time <= targetTime) answer++;
    }

    return answer;

    function dijkstra(startNode) {
        const pq = new MinHeap();

        dist[startNode] = 0;
        pq.push({ destination: startNode, distance: 0 });

        while (!pq.isEmpty()) {
            const { destination, distance } = pq.pop();

            if (distance > dist[destination]) continue;

            for (const next of graph[destination]) {
                const nextDistance = distance + next.distance;

                if (nextDistance < dist[next.destination]) {
                    dist[next.destination] = nextDistance;
                    pq.push({
                        destination: next.destination,
                        distance: nextDistance,
                    });
                }
            }
        }
    }
}