function solution(today, terms, privacies) {
    const result = [];
    const termMap = new Map();
    
    // 1. 약관 유효기간 map에 저장
    terms.forEach(t => {
        const [type, month] = t.split(' ');
        termMap.set(type, Number(month));
    });
    
    // 2. 오늘 날짜를 일수로 변환
    const [tYear, tMonth, tDay] = today.split('.').map(Number);
    const todayTotal = tYear * 12 * 28 + tMonth * 28 + tDay;
    
    // 3. 개인정보 만료일 계산 및 비교
    privacies.forEach((p, i) => {
        const [date, type] = p.split(' ');
        let [year, month, day] = date.split('.').map(Number);
        
        // 유효기간 더하기 (개월)
        month += termMap.get(type);
        
        // 년/월 갱신 (12월 초과 시)
        year += Math.floor((month - 1) / 12);
        month = (month - 1) % 12 + 1;
        
        // 만료일 일수 변환 (28일 기준)
        const expireTotal = year * 12 * 28 + month * 28 + day;
        
        // 4. 오늘보다 작으면 만료
        if (expireTotal <= todayTotal) {
            result.push(i + 1);
        }
    });
    
    return result;
}
