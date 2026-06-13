function solution(age) {
    return age.toString().split('').map(char => String.fromCharCode(Number(char) + 97)).join('');
}
