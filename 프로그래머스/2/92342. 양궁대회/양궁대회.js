let res;
let lion;
let max;

function solution(n, info) {
    res = Array(11).fill(0);
    lion = [-1];
    max = Number.MIN_SAFE_INTEGER;

    back(0, n, info);

    // 라이언이 이길 수 없는 경우
    if (max === -1) {
        return [-1];
    }

    return lion;
}

function back(depth, n, info) {
    // 화살을 모두 사용한 경우
    if (depth === n) {
        const diff = score(info);

        if (max <= diff) {
            max = diff;
            lion = [...res];
        }
        return;
    }

    // 라이언이 해당 과녁에서 어피치보다 많이 맞추면 종료
    for (let i = 0; i < info.length && res[i] <= info[i]; i++) {
        res[i]++;
        back(depth + 1, n, info);
        res[i]--;
    }
}

function score(info) {
    let apeach = 0;
    let lionScore = 0;

    for (let i = 0; i < res.length; i++) {
        if (info[i] === 0 && res[i] === 0) continue;

        if (info[i] >= res[i]) {
            apeach += 10 - i;
        } else {
            lionScore += 10 - i;
        }
    }

    const diff = lionScore - apeach;

    if (diff <= 0) return -1;
    return diff;
}