function solution(land) {
    for (let i = 1; i < land.length; i++) {
        for (let j = 0; j < 4; j++) {
            land[i][j] += Math.max(...land[i - 1].filter((_, _i) => j !== _i));
        }
    }
    return Math.max(...land.pop());
}