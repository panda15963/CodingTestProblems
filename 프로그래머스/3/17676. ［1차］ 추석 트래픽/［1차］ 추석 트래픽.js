function solution(lines) {

    const periods = [];

    // 각 로그의 처리 구간 계산
    for (const log of lines) {
        periods.push(convertTime(log));
    }

    let answer = 0;

    // 시작 시간과 종료 시간을 기준으로 처리량 계산
    for (const period of periods) {
        answer = Math.max(answer, throughput(period[0], periods));
        answer = Math.max(answer, throughput(period[1], periods));
    }

    return answer;
}

// 로그를 [시작시간, 종료시간]으로 변환
function convertTime(line) {

    const [date, time, elapse] = line.split(" ");

    const [hour, minute, sec] = time.split(":");
    const [second, millisecond] = sec.split(".");

    const endTime =
        Number(hour) * 60 * 60 * 1000 +
        Number(minute) * 60 * 1000 +
        Number(second) * 1000 +
        Number(millisecond);

    const processTime =
        parseFloat(elapse.slice(0, -1)) * 1000;

    const startTime = endTime - processTime + 1;

    return [startTime, endTime];
}

// 특정 시점부터 1초 동안의 처리량 계산
function throughput(startTime, periods) {

    let count = 0;

    const startRange = startTime;
    const endRange = startTime + 999;

    for (const [startPoint, endPoint] of periods) {

        if (!(endRange < startPoint || endPoint < startRange)) {
            count++;
        }
    }

    return count;
}