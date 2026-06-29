function solution(a, b, n) {
    let answer = 0;
    
    // 빈 병의 개수가 마트에서 교환할 수 있는 개수보다 많거나 같을 때까지 반복
    while (n >= a) {
        // 새로 받는 콜라의 병 수
        let newCoke = Math.floor(n / a) * b;
        
        // 받은 콜라의 수만큼 정답(총 받은 콜라)에 추가
        answer += newCoke;
        
        // 남은 빈 병 = 마트에 주고 남은 병(n % a) + 새로 받은 콜라병(newCoke)
        n = (n % a) + newCoke;
    }
    
    return answer;
}