class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    size() { return this.heap.length; }
    
    push(value) {
        this.heap.push(value);
        this._upHeap();
    }
    
    _upHeap() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].cost >= this.heap[parentIndex].cost) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._downHeap();
        return top;
    }
    
    _downHeap() {
        let index = 0;
        const length = this.heap.length;
        while ((index * 2 + 1) < length) {
            let left = index * 2 + 1;
            let right = left + 1;
            let smallest = index;
            
            if (this.heap[left].cost < this.heap[smallest].cost) smallest = left;
            if (right < length && this.heap[right].cost < this.heap[smallest].cost) smallest = right;
            
            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

function solution(n, paths, gates, summits) {
    // 1. 그래프 초기화
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [i, j, w] of paths) {
        graph[i].push({ to: j, cost: w });
        graph[j].push({ to: i, cost: w });
    }
    
    // 2. 출입구 및 산봉우리 구분용 Set
    const isSummit = new Set(summits);
    const isGate = new Set(gates);
    
    // 3. 거리(Intensity) 배열 초기화
    const intensities = Array(n + 1).fill(Infinity);
    const pq = new MinHeap();
    
    // 4. 모든 출입구를 우선순위 큐에 삽입
    for (const gate of gates) {
        pq.push({ node: gate, cost: 0 });
        intensities[gate] = 0;
    }
    
    // 5. 다익스트라 탐색
    while (pq.size() > 0) {
        const { node, cost } = pq.pop();
        
        // 현재 노드의 기록된 강도가 더 크면 무시
        if (intensities[node] < cost) continue;
        
        // 산봉우리에 도달했거나, 현재 비용이 이미 기록된 intensity보다 크면 탐색 중단
        if (isSummit.has(node)) continue;
        
        for (const edge of graph[node]) {
            // 출입구로는 이동 불가
            if (isGate.has(edge.to)) continue;
            
            // 이동할 지점의 새로운 intensity 계산 (현재 경로의 cost와 다음 경로의 cost 중 큰 값)
            const newIntensity = Math.max(cost, edge.cost);
            
            if (newIntensity < intensities[edge.to]) {
                intensities[edge.to] = newIntensity;
                pq.push({ node: edge.to, cost: newIntensity });
            }
        }
    }
    
    // 6. 산봉우리 중 최소 intensity와 해당 산봉우리 번호 반환
    let answer = [-1, Infinity];
    summits.sort((a, b) => a - b); // 번호가 낮은 산봉우리부터 확인
    
    for (const summit of summits) {
        if (intensities[summit] < answer[1]) {
            answer = [summit, intensities[summit]];
        }
    }
    
    return answer;
}
