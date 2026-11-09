function busiestServers(
    k: number,
    arrival: number[],
    load: number[]
): number[] {

    // Fenwick Tree: 사용 가능한 서버 관리
    class FenwickTree {
        private n: number;
        private tree: Int32Array;

        constructor(n: number) {
            this.n = n;
            this.tree = new Int32Array(n + 1);
        }

        // 특정 서버의 사용 가능 여부 변경
        add(index: number, value: number): void {
            for (let i = index + 1; i <= this.n; i += i & -i) {
                this.tree[i] += value;
            }
        }

        // [0, index) 구간의 합
        sum(index: number): number {
            let result = 0;

            for (let i = index; i > 0; i -= i & -i) {
                result += this.tree[i];
            }

            return result;
        }

        // 누적 합이 rank 이상이 되는 첫 번째 서버 탐색
        findKth(rank: number): number {
            let index = 0;
            let bit = 1;

            while (bit * 2 <= this.n) {
                bit *= 2;
            }

            for (; bit > 0; bit = Math.floor(bit / 2)) {
                const next = index + bit;

                if (
                    next <= this.n &&
                    this.tree[next] < rank
                ) {
                    rank -= this.tree[next];
                    index = next;
                }
            }

            return index;
        }
    }

    // Min Heap: 작업 중인 서버 관리
    class BusyServerMinHeap {
        private heap: [number, number][] = [];

        get size(): number {
            return this.heap.length;
        }

        push(value: [number, number]): void {
            const heap = this.heap;
            heap.push(value);

            let index = heap.length - 1;

            while (index > 0) {
                const parent = Math.floor((index - 1) / 2);

                if (heap[parent][0] <= heap[index][0]) {
                    break;
                }

                [heap[parent], heap[index]] =
                    [heap[index], heap[parent]];

                index = parent;
            }
        }

        pop(): [number, number] {
            const heap = this.heap;
            const result = heap[0];
            const last = heap.pop()!;

            if (heap.length === 0) {
                return result;
            }

            heap[0] = last;

            let index = 0;

            while (true) {
                const left = index * 2 + 1;
                const right = index * 2 + 2;

                let smallest = index;

                if (
                    left < heap.length &&
                    heap[left][0] < heap[smallest][0]
                ) {
                    smallest = left;
                }

                if (
                    right < heap.length &&
                    heap[right][0] < heap[smallest][0]
                ) {
                    smallest = right;
                }

                if (smallest === index) {
                    break;
                }

                [heap[index], heap[smallest]] =
                    [heap[smallest], heap[index]];

                index = smallest;
            }

            return result;
        }

        peek(): [number, number] | undefined {
            return this.heap[0];
        }
    }

    // 모든 서버를 사용 가능 상태로 초기화
    const available = new FenwickTree(k);

    for (let i = 0; i < k; i++) {
        available.add(i, 1);
    }

    const busy = new BusyServerMinHeap();

    // 서버별 요청 처리 횟수
    const requestCount: number[] = new Array(k).fill(0);

    // 요청 처리
    for (let i = 0; i < arrival.length; i++) {
        const startTime = arrival[i];
        const endTime = startTime + load[i];

        // 작업이 끝난 서버 복구
        while (
            busy.size > 0 &&
            busy.peek()![0] <= startTime
        ) {
            const [, serverId] = busy.pop();
            available.add(serverId, 1);
        }

        // 사용 가능한 서버 개수
        const totalAvailable = available.sum(k);

        if (totalAvailable === 0) {
            continue;
        }

        // 라운드 로빈 시작 위치
        const targetServer = i % k;

        // targetServer 이전의 사용 가능한 서버 개수
        const beforeTarget = available.sum(targetServer);

        let selectedServer: number;

        if (beforeTarget < totalAvailable) {
            // targetServer 이상에서 가장 작은 서버 선택
            selectedServer = available.findKth(beforeTarget + 1);
        } else {
            // 처음부터 다시 탐색
            selectedServer = available.findKth(1);
        }

        // 요청 할당
        requestCount[selectedServer]++;

        // 사용 가능 서버에서 제거
        available.add(selectedServer, -1);

        // 작업 종료 시간과 서버 번호 저장
        busy.push([endTime, selectedServer]);
    }

    // 최대 요청 처리 횟수
    let maxRequests = 0;

    for (const count of requestCount) {
        maxRequests = Math.max(maxRequests, count);
    }

    // 최대 요청을 처리한 서버 반환
    const result: number[] = [];

    for (let i = 0; i < k; i++) {
        if (requestCount[i] === maxRequests) {
            result.push(i);
        }
    }

    return result;
}