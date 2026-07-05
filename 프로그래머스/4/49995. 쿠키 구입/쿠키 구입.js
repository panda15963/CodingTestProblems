function solution(cookie) {
    let answer = 0;
    const cookieAcc = new Array(2001).fill(0);

    // 누적합 계산
    for (let i = 0; i < cookie.length; i++) {
        if (i === 0) {
            cookieAcc[i] = cookie[i];
        } else {
            cookieAcc[i] = cookieAcc[i - 1] + cookie[i];
        }
    }

    for (let a = 0; a < cookie.length; a++) {
        for (let b = a + 1; b < cookie.length; b++) {

            const total =
                cookieAcc[b] - (a > 0 ? cookieAcc[a - 1] : 0);

            if (Math.floor(total / 2) < answer) {
                continue;
            }

            for (let m = a; m < b; m++) {

                const left =
                    cookieAcc[m] - (a > 0 ? cookieAcc[a - 1] : 0);

                const right =
                    cookieAcc[b] - cookieAcc[m];

                if (left === right) {
                    answer = Math.max(answer, right);
                    break;
                }
            }
        }
    }

    return answer;
}