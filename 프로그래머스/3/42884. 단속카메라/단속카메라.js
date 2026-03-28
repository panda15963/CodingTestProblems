function solution(routes) {
    // 1. 진출 지점(나가는 지점) 기준 오름차순 정렬
    routes.sort((a, b) => a[1] - b[1]);

    let camera = routes[0][1];  // 첫 번째 카메라 위치
    let answer = 1;

    for (let i = 1; i < routes.length; i++) {
        const [start, end] = routes[i];

        // 현재 카메라로 이 차량의 진입 지점이 안 찍히면 새로운 카메라 설치
        if (start > camera) {
            camera = end;
            answer++;
        }
        // start ≤ camera 이면, 카메라가 이미 이 차량의 구간을 포함
    }

    return answer;
}