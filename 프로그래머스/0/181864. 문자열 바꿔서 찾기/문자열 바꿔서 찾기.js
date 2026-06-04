function solution(myString, pat) {
    // 1. myString을 배열로 변환 후 "A"는 "B"로, "B"는 "A"로 변경
    // 2. 다시 문자열로 합치고 pat이 포함되어 있는지 확인
    const converted = [...myString].map(v => v === 'A' ? 'B' : 'A').join('');
    
    // 3. 포함 여부에 따라 1 또는 0 반환
    return converted.includes(pat) ? 1 : 0;
}
