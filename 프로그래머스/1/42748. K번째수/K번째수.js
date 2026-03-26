function solution(array, commands) {
    return commands.map(([i, j, k]) => {
        const sub = array.slice(i-1, j).sort((a, b) => a - b);
        return sub[k-1];
    });
}
