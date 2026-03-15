function solution(balls, share) {
    let result = 1;
    for (let i = 1; i <= share; i++) {
        result *= (balls - i + 1);
        result /= i;
    }
    return result;
}
