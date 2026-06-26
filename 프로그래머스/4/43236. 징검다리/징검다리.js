function solution(distance, rocks, n) {
    // 바위 위치 오름차순 정렬
    rocks.sort((a, b) => a - b);

    let left = 1;
    let right = distance;
    let answer = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        let removed = 0;
        let prev = 0; // 시작점

        for (const rock of rocks) {
            if (rock - prev < mid) {
                // 현재 바위 제거
                removed++;
            } else {
                // 현재 바위 유지
                prev = rock;
            }
        }

        // 마지막 구간(마지막 바위 ~ 도착지)
        if (distance - prev < mid) {
            removed++;
        }

        if (removed > n) {
            // 제거해야 하는 바위가 너무 많음 → 거리 줄이기
            right = mid - 1;
        } else {
            // 가능 → 최소 거리를 더 크게 시도
            answer = mid;
            left = mid + 1;
        }
    }

    return answer;
}