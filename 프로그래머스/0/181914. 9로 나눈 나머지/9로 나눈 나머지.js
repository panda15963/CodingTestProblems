function solution(number) {
    const sum = number.split('').reduce((acc, c) => acc + +c, 0);
    return sum % 9;
}
