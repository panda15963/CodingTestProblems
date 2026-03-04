function solution(a, b, c, d) {
    const dice = [a, b, c, d].sort((x, y) => x - y);
    if (dice[0] === dice[3]) {
        return 1111 * dice[0];
    } else if (dice[0] === dice[2]) {
        return (10 * dice[0] + dice[3]) ** 2;
    } else if (dice[1] === dice[3]) {
        return (10 * dice[1] + dice[0]) ** 2;
    } else if (dice[0] === dice[1] && dice[2] === dice[3]) {
        return (dice[0] + dice[3]) * Math.abs(dice[3] - dice[0]);
    } else if (dice[0] === dice[1]) {
        return dice[2] * dice[3];
    } else if (dice[1] === dice[2]) {
        return dice[0] * dice[3];
    } else if (dice[2] === dice[3]) {
        return dice[0] * dice[1];
    }
    return dice[0];
}
