let bus;
let crew;

function solution(n, t, m, timetable) {

    bus = new Array(n);
    crew = Array.from({ length: n }, () => []);

    // 버스 시간표 생성
    bus[0] = 540;

    for (let i = 1; i < n; i++) {
        bus[i] = bus[i - 1] + t;
    }

    timetable.sort();

    // 크루 배치
    for (const time of timetable) {
        findBus(strToInt(time), n, m);
    }

    const answer = getAnswer(n, m);

    return intToStr(answer);
}

function strToInt(str) {

    const [hour, minute] = str.split(":").map(Number);

    return hour * 60 + minute;
}

function intToStr(time) {

    const hour = Math.floor(time / 60);
    const minute = time % 60;

    return (
        String(hour).padStart(2, "0") +
        ":" +
        String(minute).padStart(2, "0")
    );
}

function findBus(min, n, m) {

    // 가장 늦은 버스보다 늦게 도착
    if (bus[n - 1] < min) {
        return;
    }

    // 탑승 가능한 가장 빠른 버스에 배치
    for (let i = 0; i < n; i++) {

        if (bus[i] >= min && crew[i].length < m) {
            crew[i].push(min);
            break;
        }
    }
}

function getAnswer(n, m) {

    // 마지막 버스에 자리가 남아있는 경우
    if (crew[n - 1].length < m) {
        return bus[n - 1];
    }

    // 마지막 버스가 가득 찬 경우
    return crew[n - 1][m - 1] - 1;
}