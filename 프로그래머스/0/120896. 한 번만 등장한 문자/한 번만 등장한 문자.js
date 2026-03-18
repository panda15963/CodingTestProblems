function solution(s) {
    const map = new Map();
    for (let c of s) {
        map.set(c, (map.get(c) || 0) + 1);
    }
    let result = '';
    for (let [c, cnt] of map) {
        if (cnt === 1) result += c;
    }
    return result.split('').sort().join('');
}
