function solution(score) {
    const avg = score.map(([eng, math]) => (eng + math) / 2);
    const sortedAvg = [...avg].sort((a, b) => b - a);
    return avg.map(a => sortedAvg.indexOf(a) + 1);
}
