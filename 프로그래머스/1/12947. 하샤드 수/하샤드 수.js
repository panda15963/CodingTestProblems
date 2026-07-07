function solution(x) {
    // x를 문자열로 변환 후 각 자릿수를 더하기
    let digitSum = String(x).split('').reduce((acc, curr) => acc + Number(curr), 0);
    
    // x가 자릿수의 합으로 나누어 떨어지는지 확인
    return x % digitSum === 0;
}
