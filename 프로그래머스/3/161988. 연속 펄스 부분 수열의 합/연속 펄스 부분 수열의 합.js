function solution(sequence) {
    const n = sequence.length;
    let p1 = new Array(n); // 1, -1, 1, -1...
    let p2 = new Array(n); // -1, 1, -1, 1...
    
    // 1. 펄스 수열 곱한 배열 생성
    for (let i = 0; i < n; i++) {
        p1[i] = i % 2 === 0 ? sequence[i] * 1 : sequence[i] * -1;
        p2[i] = i % 2 === 0 ? sequence[i] * -1 : sequence[i] * 1;
    }
    
    // 2. 카데인 알고리즘 함수
    function getMaxSum(arr) {
        let maxVal = arr[0];
        let currentMax = arr[0];
        
        for (let i = 1; i < arr.length; i++) {
            currentMax = Math.max(arr[i], currentMax + arr[i]);
            maxVal = Math.max(maxVal, currentMax);
        }
        return maxVal;
    }
    
    // 3. 두 경우 중 최댓값 반환
    return Math.max(getMaxSum(p1), getMaxSum(p2));
}
