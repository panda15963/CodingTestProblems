function solution(i, j, k) {
    let count = 0;
    for (let num = i; num <= j; num++) {
        count += String(num).split('').filter(c => c === String(k)).length;
    }
    return count;
}
