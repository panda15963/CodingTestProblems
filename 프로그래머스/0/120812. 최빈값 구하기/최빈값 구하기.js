function solution(array) {
    const freq = {};
    for (let num of array) {
        freq[num] = (freq[num] || 0) + 1;
    }
    const maxCnt = Math.max(...Object.values(freq));
    const modes = Object.entries(freq).filter(([_, cnt]) => cnt === maxCnt).map(([num]) => +num);
    return modes.length === 1 ? modes[0] : -1;
}
