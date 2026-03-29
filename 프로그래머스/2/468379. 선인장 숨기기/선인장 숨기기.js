function solution(m, n, h, w, drops) {
    // 1. 비가 오는 시점 기록 (충분히 큰 값으로 초기화)
    const INF = 1000001;
    const grid = Array.from({ length: m }, () => new Int32Array(n).fill(INF));

    for (let i = 0; i < drops.length; i++) {
        const [r, c] = drops[i];
        if (grid[r][c] === INF) {
            grid[r][c] = i;
        }
    }

    // 슬라이딩 윈도우 최솟값을 구하는 함수 (Deque 활용)
    function getSlidingMin(arr, k) {
        const result = new Int32Array(arr.length - k + 1);
        const deque = []; // index 저장
        for (let i = 0; i < arr.length; i++) {
            while (deque.length > 0 && arr[deque[deque.length - 1]] >= arr[i]) {
                deque.pop();
            }
            deque.push(i);
            if (deque[0] <= i - k) {
                deque.shift();
            }
            if (i >= k - 1) {
                result[i - k + 1] = arr[deque[0]];
            }
        }
        return result;
    }

    // 2. 가로 방향(w) 최솟값 전처리
    const rowMin = [];
    for (let r = 0; r < m; r++) {
        rowMin.push(getSlidingMin(grid[r], w));
    }

    // 3. 세로 방향(h) 최솟값 계산하며 최적의 위치 찾기
    let maxTime = -1;
    let answer = [0, 0];

    // 각 열(c)에 대해 세로로 훑음
    for (let c = 0; c < n - w + 1; c++) {
        const colData = [];
        for (let r = 0; r < m; r++) {
            colData.push(rowMin[r][c]);
        }

        const finalMinTime = getSlidingMin(colData, h);

        for (let r = 0; r < finalMinTime.length; r++) {
            const currentTime = finalMinTime[r];

            // 더 늦게 비를 맞는 경우 업데이트
            if (currentTime > maxTime) {
                maxTime = currentTime;
                answer = [r, c];
            } 
            // 시점이 같다면 문제 조건(가장 위, 가장 왼쪽)에 따라 
            // 순회 순서상 먼저 나온 것이 정답이므로 별도 업데이트 불필요
            if (maxTime === INF) break; // 이미 절대 안 맞는 곳 찾으면 해당 열 종료 가능
        }
    }

    return answer;
}