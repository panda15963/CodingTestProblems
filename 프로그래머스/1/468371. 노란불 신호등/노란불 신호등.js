function solution(signals) {
    let answer = 0;

    let max = 1;
    for (const signal of signals) {
        max *= (signal[0] + signal[1] + signal[2]);
    }

    while (answer <= max) {
        let flag = true;

        for (const signal of signals) {
            flag = flag && isYellow(answer, signal);
        }

        if (flag) return answer;
        answer++;
    }

    return -1;
}

function isYellow(sec, signal) {
    sec = sec % (signal[0] + signal[1] + signal[2]);

    if (sec >= signal[0] + 1 && sec <= signal[0] + signal[1]) {
        return true;
    } else {
        return false;
    }
}