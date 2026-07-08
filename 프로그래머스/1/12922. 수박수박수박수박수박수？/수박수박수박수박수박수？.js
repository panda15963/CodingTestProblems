function solution(n) {
    const length = Math.floor(n / 2);

    let answer = "";

    for (let i = 0; i < length; i++) {
        answer += "수박";
    }

    if (n % 2 === 1) {
        answer += "수";
    }

    return answer;
}