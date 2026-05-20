function solution(elements) {
    const circular = elements.concat(elements); // 배열을 두 배로 늘려 원형 수열 표현
    const sums = new Set(); // 중복 합 제거를 위한 Set 객체

    for (let i = 1; i <= elements.length; i++) { // 부분 수열의 길이 (1 ~ elements 길이)
        let sum = 0;
        
        for (let j = 0; j < elements.length; j++) { // 시작 인덱스
            if (j === 0) {
                // 첫 번째 길이에 대한 초기 합계 계산
                sum = circular.slice(0, i).reduce((acc, cur) => acc + cur, 0);
            } else {
                // 이전 합에서 맨 앞 값을 빼고, 새로운 맨 뒤 값을 더하여 최적화 (Sliding Window)
                sum = sum - circular[j - 1] + circular[j + i - 1];
            }
            sums.add(sum);
        }
    }

    return sums.size; // 고유한 합의 개수 반환
}
