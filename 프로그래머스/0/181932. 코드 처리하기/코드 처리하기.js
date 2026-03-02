function solution(code) {
    let ret = '';
    let mode = 0;  // 0: 짝수 idx, 1: 홀수 idx
    
    for (let idx = 0; idx < code.length; idx++) {
        if (code[idx] === '1') {
            mode = 1 - mode;  // 토글
        } else if (mode === 0) {
            if (idx % 2 === 0) ret += code[idx];
        } else {
            if (idx % 2 === 1) ret += code[idx];
        }
    }
    
    return ret === '' ? 'EMPTY' : ret;
}
