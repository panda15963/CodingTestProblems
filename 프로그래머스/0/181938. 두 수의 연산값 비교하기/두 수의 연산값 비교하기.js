function solution(a, b) {
    // a ⊕ b: a와 b를 문자열로 붙여서 Number로 변환
    const concat = Number(String(a) + String(b));
    
    // 2 * a * b
    const product = 2 * a * b;
    
    // 더 큰 값 반환, 같으면 concat 반환
    return concat >= product ? concat : product;
}
