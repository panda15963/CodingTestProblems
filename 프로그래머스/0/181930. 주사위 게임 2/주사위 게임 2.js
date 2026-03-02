function solution(a, b, c) {
    const sum1 = a + b + c;
    const sum2 = a*a + b*b + c*c;
    const sum3 = a*a*a + b*b*b + c*c*c;
    
    const cnt = new Set([a, b, c]).size;
    return cnt === 3 ? sum1 : cnt === 2 ? sum1 * sum2 : sum1 * sum2 * sum3;
}
