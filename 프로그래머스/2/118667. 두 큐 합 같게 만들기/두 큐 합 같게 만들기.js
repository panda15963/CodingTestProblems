function solution(queue1, queue2) {
    let sum1 = queue1.reduce((a, c) => a + c, 0);
    let sum2 = queue2.reduce((a, c) => a + c, 0);
    
    // 두 큐의 원소를 모두 합한 값
    const totalSum = sum1 + sum2;
    
    // 총합이 홀수면 절대 두 큐의 합을 같게 나눌 수 없음
    if (totalSum % 2 !== 0) return -1;
    
    const target = totalSum / 2;
    
    // 두 큐를 하나의 배열로 병합 (각 큐의 포인터를 관리하기 위함)
    const combined = [...queue1, ...queue2];
    let left = 0;
    let right = queue1.length; // queue2의 시작 인덱스
    
    let count = 0;
    const limit = combined.length * 2;
    
    while (count < limit) {
        if (sum1 === target) {
            return count;
        }
        
        if (sum1 > target) {
            sum1 -= combined[left];
            left++;
        } else {
            sum1 += combined[right];
            right++;
        }
        count++;
    }
    
    return -1;
}