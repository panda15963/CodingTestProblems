var findMaximizedCapital = function(k, w, profits, capital) {
    const n = capital.length;

    // Min heap: 필요 자본 기준 오름차순 정렬
    const projects = [];

    for (let i = 0; i < n; i++) {
        projects.push([capital[i], profits[i]]);
    }

    projects.sort((a, b) => a[0] - b[0]);

    // Max heap: 수익 기준 내림차순
    const maxProfitHeap = [];

    const pushMaxHeap = (value) => {
        maxProfitHeap.push(value);

        let i = maxProfitHeap.length - 1;

        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);

            if (maxProfitHeap[parent] >= maxProfitHeap[i]) {
                break;
            }

            [maxProfitHeap[parent], maxProfitHeap[i]] =
                [maxProfitHeap[i], maxProfitHeap[parent]];

            i = parent;
        }
    };

    const popMaxHeap = () => {
        const result = maxProfitHeap[0];
        const last = maxProfitHeap.pop();

        if (maxProfitHeap.length > 0) {
            maxProfitHeap[0] = last;

            let i = 0;

            while (true) {
                let largest = i;
                const left = 2 * i + 1;
                const right = 2 * i + 2;

                if (
                    left < maxProfitHeap.length &&
                    maxProfitHeap[left] > maxProfitHeap[largest]
                ) {
                    largest = left;
                }

                if (
                    right < maxProfitHeap.length &&
                    maxProfitHeap[right] > maxProfitHeap[largest]
                ) {
                    largest = right;
                }

                if (largest === i) {
                    break;
                }

                [maxProfitHeap[i], maxProfitHeap[largest]] =
                    [maxProfitHeap[largest], maxProfitHeap[i]];

                i = largest;
            }
        }

        return result;
    };

    let index = 0;

    // 최대 k개의 프로젝트 선택
    while (k-- > 0) {
        // 현재 자본으로 진행 가능한 프로젝트 추가
        while (index < n && projects[index][0] <= w) {
            pushMaxHeap(projects[index][1]);
            index++;
        }

        // 진행 가능한 프로젝트가 없으면 종료
        if (maxProfitHeap.length === 0) {
            break;
        }

        // 가장 수익이 높은 프로젝트 선택
        w += popMaxHeap();
    }

    return w;
};