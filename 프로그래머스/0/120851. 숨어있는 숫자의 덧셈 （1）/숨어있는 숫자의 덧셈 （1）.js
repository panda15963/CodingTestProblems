function solution(my_string) {
    return [...my_string]
        .filter(c => !isNaN(c) && c !== '0')
        .reduce((acc, c) => acc + +c, 0);
}
