var busiestServers = function(k, arrival, load) {
    // Fenwick Tree: 사용 가능한 서버 관리
    class FenwickTree {
        constructor(n) {
            this.n = n;
            this.tree = new Int32Array(n + 1);
        }

        // 특정 서버의 사용 가능 여부 변경
        add(index, value) {
            for (let i = index + 1; i <= this.n; i += i & -i) {
                this.tree[i] += value;
            }
        }

        // [0, index) 구간의 합
        sum(index) {
            let result = 0;

            for (let i = index; i > 0; i -= i & -i) {
                result += this.tree[i];
            }

            return result;
        }

        // 누적 합이 rank 이상이 되는 첫 번째 서버 탐색
        findKth(rank) {
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
        constructor() {
            this.heap = [];
        }

        get size() {
            return this.heap.length;
        }

        push(value) {
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

        pop() {
            const heap = this.heap;
            const result = heap[0];
            const last = heap.pop();

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
    }

    // 모든 서버를 처음에는 사용 가능 상태로 설정
    const available = new FenwickTree(k);

    for (let i = 0; i < k; i++) {
        available.add(i, 1);
    }

    const busy = new BusyServerMinHeap();

    // 서버별 요청 처리 횟수
    const requestCount = new Array(k).fill(0);

    // 요청 처리
    for (let i = 0; i < arrival.length; i++) {
        const startTime = arrival[i];
        const endTime = startTime + load[i];

        // 작업이 끝난 서버를 다시 사용 가능 상태로 변경
        while (
            busy.size > 0 &&
            busy.heap[0][0] <= startTime
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

        // targetServer 이전에 사용 가능한 서버 개수
        const beforeTarget = available.sum(targetServer);

        let selectedServer;

        if (beforeTarget < totalAvailable) {
            // targetServer 이상에서 가장 작은 서버 선택
            selectedServer = available.findKth(beforeTarget + 1);
        } else {
            // 끝까지 찾지 못하면 처음부터 탐색
            selectedServer = available.findKth(1);
        }

        // 서버에 요청 할당
        requestCount[selectedServer]++;

        // 사용 가능 서버에서 제거
        available.add(selectedServer, -1);

        // 작업 종료 시간과 서버 번호를 Min Heap에 추가
        busy.push([endTime, selectedServer]);
    }

    // 최대 요청 처리 횟수 계산
    let maxRequests = 0;

    for (const count of requestCount) {
        maxRequests = Math.max(maxRequests, count);
    }

    // 최대 요청을 처리한 서버 반환
    const result = [];

    for (let i = 0; i < k; i++) {
        if (requestCount[i] === maxRequests) {
            result.push(i);
        }
    }

    return result;
};