function solution(picture, k) {
    const result = [];
    for (let row of picture) {
        const newRow = row.split('').map(c => c.repeat(k)).join('');
        for (let i = 0; i < k; i++) {
            result.push(newRow);
        }
    }
    return result;
}
