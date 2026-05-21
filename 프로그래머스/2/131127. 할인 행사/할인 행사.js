function solution(want, number, discount) {
    let answer = 0;
    const totalDays = 10;
    
    // 구매하고자 하는 품목과 수량을 Map으로 매핑
    const wantMap = new Map();
    for (let i = 0; i < want.length; i++) {
        wantMap.set(want[i], number[i]);
    }
    
    // 첫째 날을 기준으로 10일간 할인하는 품목의 개수를 Map에 반영
    const currentMap = new Map();
    for (let i = 0; i < totalDays; i++) {
        currentMap.set(discount[i], (currentMap.get(discount[i]) || 0) + 1);
    }
    
    // 첫째 날 구성이 정현이가 원하는 목록과 일치하는지 확인하는 함수
    const checkMatch = () => {
        for (let [item, count] of wantMap.entries()) {
            if ((currentMap.get(item) || 0) !== count) {
                return false;
            }
        }
        return true;
    }
    
    if (checkMatch()) answer++;
    
    // 슬라이딩 윈도우: 1일씩 날짜를 이동하며 Map 업데이트
    for (let i = totalDays; i < discount.length; i++) {
        // 1. 윈도우에서 빠지는 가장 앞의 날짜 상품 카운트 감소
        const prevItem = discount[i - totalDays];
        currentMap.set(prevItem, currentMap.get(prevItem) - 1);
        
        // 2. 윈도우에 새롭게 추가되는 날짜 상품 카운트 증가
        const nextItem = discount[i];
        currentMap.set(nextItem, (currentMap.get(nextItem) || 0) + 1);
        
        // 3. 일치 여부 확인
        if (checkMatch()) answer++;
    }
    
    return answer;
}
