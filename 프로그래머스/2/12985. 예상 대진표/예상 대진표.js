function solution(n, a, b) {

    let answer = 0;

    // 두 참가자가 만날 때까지 라운드 진행
    while (a !== b) {

        a = Math.floor((a + 1) / 2);
        b = Math.floor((b + 1) / 2);

        answer++;
    }

    return answer;
}